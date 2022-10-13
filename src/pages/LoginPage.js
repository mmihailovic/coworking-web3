import React from 'react';
import logo from '../assets/mylogo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from 'react';
import { setAvatar, insertAvatar, selectUser, insertUser, shareTicketWeb2, numberOfUnreadNotificationWeb2, numberOfReadNotifications } from '../web2communication';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { UserContext } from '../context/userContext';
import { logoutUser } from '../service/magic';
import ConfirmPopup from '../components/ConfirmPopup';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Wallet from '../components/Wallet';
import { Route, Routes } from 'react-router-dom';
import Tickets from '../components/Tickets';
import { selectTickets } from '../web2communication';
import NotificationCenter from '../components/NotificationCenter';
import CardPopup from '../components/CardPopup';
import io from 'socket.io-client'
let socket;
const CONNECTION_PORT = "https://coworking-khuti.ondigitalocean.app";


const LoginPage = ({ onClick, setAccount, setBalance, setUserAvatar, setConnected }) => {
  const navigate = useNavigate();
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [redeemedTickets, setRedeemedTickets] = useState([]);
  const [expiredTickets, setExpiredTickets] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [available, setAvailable] = useState(true);
  const [redeemed, setRedeemed] = useState(false);
  const [expired, setExpired] = useState(false);
  const [first, setFirst] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [numberOfUnreadNotifications, setNumberOfUnreadNotifications] = useState();
  const [numberOfReadNotifications, setNumberOfReadNotifications] = useState();
  const [cardInNotificationPopup, setCardInNotificationPopup] = useState();
  const [notificationInNotificationPopup, setNotificationInNotificationPopup] = useState();
  const { ethereum } = window;
  const { email } = useContext(UserContext);
  const history = useNavigate();

  async function generateAvatar() {
    let x = Math.floor((Math.random() * 8) + 1);
    insertUser(email, "avatar" + x + ".svg");
    setAvatar("avatar" + x + ".svg");
    setShowConfirmPopup(false);
  }
  async function loadAvatar() {
    let myAvatar = await selectUser(email);
    if (myAvatar == "user not existing") {
      setShowConfirmPopup(true);
    }
    else setAvatar(myAvatar);
  }
  async function loadNotificationInfo() {
    //numberOfReadNotifications = await numberOfUnreadNotificationWeb2("mihailjovanoski14", true);
    //numberOfUnreadNotifications = await numberOfUnreadNotificationWeb2(email, false);

    setNumberOfUnreadNotifications(await numberOfUnreadNotificationWeb2(email, false));
    setNumberOfReadNotifications(await numberOfUnreadNotificationWeb2(email, true));

    console.log("read: " + numberOfReadNotifications);
    console.log("unread: " + numberOfUnreadNotifications);
  }
  useEffect(() => {
    socket = io(CONNECTION_PORT, { path: '/api/socket.io' });
    socket.emit("user_connected", email);
    socket.on("card_received", (data) => {
      loadNotificationInfo();
      console.log(data);
    })
  }, [CONNECTION_PORT])
  useEffect(() => {
    loadNotificationInfo();
  }, [])
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      else sethaveMetamask(true);
    };
    checkMetamaskAvailability();
    if (haveMetamask) checkIfWalletIsConnected(setConnected);
    if (avatar == null) loadAvatar();
    if (email == null) {
      navigate('/');
    }
    getTickets();
  }, []);
  const parseTickets = (expirationDates, hash, email) => {
    let tmpArr = [];
    for (let i = 0; i < hash.length; i++) {
      tmpArr.push({
        id: parseInt(i + 1),
        expirationDate: new Date(expirationDates[i]).toLocaleDateString('en-GB'),
        hash: (hash[i]),
        email: (email[i])
      })
    }

    return tmpArr;
  }
  async function getTickets() {
    console.log('loading');
    try {
      const today = new Date();
      let userTickets = [];
      userTickets = await selectTickets(email);

      const exDatesOfAvailableTickets = [];
      const exDatesOfRedeemedTickets = [];
      const exDatesOfExpiredTickets = [];

      const hashesOfAvailableTickets = [];
      const hashesOfRedeemedTickets = [];
      const hashesOfExpiredTickets = [];


      let emailsArrOfAvailableTickets = [];
      let emailsArrOfRedeemedTickets = [];
      let emailsArrOfExpiredTickets = [];

      for (let i = 0; i < userTickets.length; i++) {
        const ticketDate = new Date(userTickets[i].end_date);
        if (userTickets[i].activated == false)
          userTickets[i].email = "Not redeemed";
        else userTickets[i].email = email;
        if (ticketDate < today) {
          exDatesOfExpiredTickets.push(userTickets[i].end_date);
          hashesOfExpiredTickets.push(userTickets[i].id);
          emailsArrOfExpiredTickets.push(userTickets[i].email);
        }
        else {
          if (userTickets.activated) {
            exDatesOfRedeemedTickets.push(userTickets[i].end_date);
            hashesOfRedeemedTickets.push(userTickets[i].id);
            emailsArrOfExpiredTickets.push(userTickets[i].email);
          }
          else {
            exDatesOfAvailableTickets.push(userTickets[i].end_date);
            hashesOfAvailableTickets.push(userTickets[i].id);
            emailsArrOfAvailableTickets.push(userTickets[i].email);
          }
        }
      }
      setTickets(parseTickets(exDatesOfAvailableTickets, hashesOfAvailableTickets, emailsArrOfAvailableTickets)); // available tickets
      setRedeemedTickets(parseTickets(exDatesOfRedeemedTickets, hashesOfRedeemedTickets, emailsArrOfRedeemedTickets));
      setExpiredTickets(parseTickets(exDatesOfExpiredTickets, hashesOfExpiredTickets, emailsArrOfExpiredTickets));
      console.log('end');

    } catch (err) {
      console.log("Err tickets: " + err);
    }
  }
  const ConnectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      if (avatar == null || avatar == "user not existing") {
        console.log('nema avatar pri connect wallet');
        generateAvatar();
      }
      setAccount(accounts[0]);
      setBalance(bal);
      setConnected(true);
      setShowConfirmPopup(false);
      navigate('/main/tickets');
    } catch (error) {
      setConnected(false);
    }
  }
  async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        setAccount(account);
        ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"]
        }).then((balance) => {
          console.log("Already connected!")
          setBalance(balance);
          setConnected(true);
          navigate("/main/tickets");
        });
      }
    }
  }
  return (
    <>
      <div className='mainDiv'>
        <Header walletAddress={email} avatar={avatar} numberOfUnreadNotifications={numberOfUnreadNotifications} setNumberOfUnreadNotifications={setNumberOfUnreadNotifications}></Header>
        <div style={{ position: "relative", width: "100%", height: "80%", marginLeft: "2%", marginTop: "1%" }}>
          <div style={{ position: "relative", width: "23%", height: "85%" }}>
            <Dashboard web2={true} unreadNotifications={numberOfUnreadNotifications}></Dashboard>
          </div>
          <Routes>
            <Route path="tickets" element={<Tickets onCardClick={() => { }} cards={available ? tickets : redeemed ? redeemedTickets : expiredTickets} available={available} redeemed={redeemed} expired={expired} setAvailableCards={setAvailable} setRedeemedCards={setRedeemed} setExpiredCards={setExpired} first={first} setFirst={setFirst}></Tickets>} />
            <Route path="notifications" element={<NotificationCenter setCardInNotificationPopup={setCardInNotificationPopup} setNotificationInNotificationPopup={setNotificationInNotificationPopup}
              email={email} setShowCardPopup={setShowCardPopup} numberOfUnreadNotifications={numberOfUnreadNotifications}
              setNumberOfUnreadNotifications={setNumberOfUnreadNotifications}>
            </NotificationCenter>} />
            <Route path="wallet" element={<Wallet onClick={ConnectWallet}></Wallet>}></Route>
          </Routes>
        </div>
      </div>
      <ConfirmPopup showPopup={showConfirmPopup} connectFunc={ConnectWallet} skipFunc={generateAvatar}></ConfirmPopup>
      <CardPopup card={cardInNotificationPopup} notification={notificationInNotificationPopup} showPopup={showCardPopup} skipFunc={setShowCardPopup} func={() => console.log('redeem')} email={'petar@altlabs.dev'}></CardPopup>
    </>
  )
}

export default LoginPage