import React, { useEffect, useContext } from 'react';
import Cards from '../components/Cards';
import Stat from '../components/Stat';
import { useState } from 'react';
import "../style/mainpageStyle.css"
import { BigNumber, ethers } from 'ethers';
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Rent from '../artifacts/contracts/Rent.sol/Rent.json';
import USDC from '../artifacts/contracts/Rent.sol/USDC.json';
import Button from 'react-bootstrap/Button';
import profile from '../assets/profile.png'
import Loader from '../components/Loader';
import logo from '../assets/mylogo.svg';
import { TbCircles, TbArmchair2 } from 'react-icons/tb';
import { RiHandCoinLine } from 'react-icons/ri'
import Popup from '../components/Popup';
import InputSpinner from 'react-bootstrap-input-spinner';
import { useNavigate } from 'react-router-dom';
import CardPopup from '../components/CardPopup';

import { selectEmailWeb2, insertTicketsWeb2, selectUser, shareTicketWeb2, numberOfUnreadNotificationWeb2, selectSingleTicketWeb2 } from '../web2communication';
import Header from '../components/Header';
import Tickets from '../components/Tickets';
import Dashboard from '../components/Dashboard';
import io from "socket.io-client";
import { UserContext } from '../context/userContext';
import NotificationCenter from '../components/NotificationCenter';
import { Route, Routes } from 'react-router-dom';
import MyWallet from '../components/MyWallet';
import ConfirmPopup from '../components/ConfirmPopup';
import PopupWithEmail from '../components/PopupWithEmail';
import SuccessfullTransactionPopup from '../components/SuccessfullTransactionPopup';
import TransactionPopup from '../components/TransactionPopup';
import MyDesks from '../components/MyDesks';

let socket;
const CONNECTION_PORT = "https://coworking-khuti.ondigitalocean.app";
//const CONNECTION_PORT = "http://localhost:3002/";

const Mainpage = ({ accountAddress, userAvatar }) => {

  const [beoTokenBalance, setBeoTokenBalance] = useState();
  const [stakedTokens, setStakedTokens] = useState(0);
  const [rentedPlaces, setRentedPlaces] = useState();
  const [canRent, setCanRent] = useState();
  const [tickets, setTickets] = useState([]);
  const [redeemedTickets, setRedeemedTickets] = useState([]);
  const [expiredTickets, setExpiredTickets] = useState([]);
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const [stakingValue, setStakingValue] = useState(0);
  const [rentPlaceCount, setRentPlaceCount] = useState(0);
  const [rentPeriod, setRentPeriod] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState();
  const [popupTitle, setpopupTitle] = useState();
  const [available, setAvailable] = useState(true);
  const [redeemed, setRedeemed] = useState(false);
  const [expired, setExpired] = useState(false);
  const [first, setFirst] = useState(true);
  const [avatar, setAvatar] = useState(userAvatar);
  const [notificationShow, setNotificationShow] = useState(false);
  const [cardInNotificationPopup, setCardInNotificationPopup] = useState();
  const [notificationInNotificationPopup, setNotificationInNotificationPopup] = useState();
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [showUnstakePopup, setShowUnstakePopup] = useState(false);
  const { email } = useContext(UserContext);
  const navigate = useNavigate();


  const [numberOfUnreadNotifications, setNumberOfUnreadNotifications] = useState();
  const [numberOfReadNotifications, setNumberOfReadNotifications] = useState();
  //var numberOfUnreadNotifications;
  //var numberOfReadNotifications;

  useEffect(() => {
    if (email == null) navigate('/');
    window.ethereum.on("accountsChanged", accounts => {
      if (accounts[0] === accountAddress);
      else if (email != null) navigate('/login/tickets', { replace: true });
    });
  }, []);

  useEffect(() => {
    socket = io(CONNECTION_PORT, { path: '/api/socket.io' });
    socket.emit("user_connected", email);
    socket.on("card_received", (data) => {
      loadNotificationInfo();
      console.log(data);
    })
  }, [CONNECTION_PORT, email])


  async function shareTicket(hash) {

    let receiver_email = "mihailjovanoski14@gmail.com";
    //let singleTicketInfo = await selectSingleTicketWeb2(hash);
    //console.log(singleTicketInfo);

    let request = await shareTicketWeb2(hash, receiver_email);
    if (request == 201) {
      let data = {
        sender_email: email,
        receiver_email: receiver_email,
        hash: hash,
      }
      socket.emit("shared_ticket", (data));
    }
    console.log('gotovo');
  }

  async function loadNotificationInfo() {

    setNumberOfUnreadNotifications(await numberOfUnreadNotificationWeb2(email, false));
    setNumberOfReadNotifications(await numberOfUnreadNotificationWeb2(email, true));

    console.log("read: " + numberOfReadNotifications);
    console.log("unread: " + numberOfUnreadNotifications);
  }

  async function loadAvatar() {
    let myAvatar = await selectUser(email);
    setAvatar(myAvatar);
  }

  useEffect(() => {
    loadNotificationInfo();
    loadAvatar();
  }, [email])

  useEffect(() => {
    for (let i = 0; i < tickets.length; i++) {
      insertTicketsWeb2(tickets[i].hash, tickets[i].expirationDate);
    }
  }, [tickets])
  useEffect(() => {
    loadNotificationInfo();
  }, [numberOfUnreadNotifications])

  async function loadingAnimation(request, msg) {
    setMsg(msg);
    setLoading(true);
    await request.wait();
    setLoading(false);
  }

  async function getTokenBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const token = new ethers.Contract(process.env.REACT_APP_tokenAddress, Token.abi, provider);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts[0] > 0) {
        const bal = await token.balanceOf(accounts[0]);
        setBeoTokenBalance(Math.trunc(ethers.utils.formatEther(bal)));
      }
      else console.log("greska");
    }
  }

  async function GetStakingBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, provider);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        const stakeBal = await rentContract.getStakingBalance(accounts[0]);
        const x = Math.trunc(ethers.utils.formatEther(stakeBal));
        setStakedTokens(x);
        console.log("NUMBE OF STAKED TOKENS" + x);

        const rented = await rentContract.numberOfRentedPlacesForAddress(accounts[0]);
        setRentedPlaces(rented.toNumber());

      } catch (err) {
        console.log("Err: " + err);
      }

    }
  }

  async function getRentInfo() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const rented = await rent.numberOfRentedPlacesForAddress(accounts[0]);
        setRentedPlaces(rented.toNumber());
      } catch (err) {
        console.log("Err rent: " + err);
      }
    }
  }
  const parseTickets = (expirationDates, hash, email) => {
    let tmpArr = [];
    for (let i = 0; i < hash.length; i++) {
      tmpArr.push({
        id: parseInt(i + 1),
        expirationDate: new Date(expirationDates[i] * 1000).toLocaleDateString('en-GB'),
        hash: (hash[i]),
        email: (email[i])
      })
    }

    return tmpArr;
  }

  async function getTickets() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const rent = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, provider);
      setLoading(true);
      setMsg("Loading tickets ... ");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const exDates = [];
        const exDatesOfRedeemedTickets = [];
        const hashes = await rent.getUserHash({ from: accounts[0] });
        const hashesOfAvailableTickets = [];
        const hashesOfRedeemedTickets = [];
        // for (let i = 0; i < hashes.length; i++) {
        //   exDates.push(BigNumber.from(await rent.getExpireDate(i, { from: accounts[0] })));
        // }

        let emailsArr = [];
        let emailsArrOfRedeemedTickets = [];

        // for (let i = 0; i < hashes.length; i++) {
        //   emailsArr.push("Not redeemed");
        // }

        for (let i = 0; i < hashes.length; i++) {
          var emailCurr = await selectEmailWeb2(hashes[i]);
          //emailsArr[i] = email === "no_hashes" ? "Not redeemed" : email;
          if (emailCurr === "no_hashes") emailCurr = "Not redeemed";
          if (emailCurr === "Not redeemed") {
            emailsArr.push(emailCurr);
            exDates.push(BigNumber.from(await rent.getExpireDate(i, { from: accounts[0] })));
            hashesOfAvailableTickets.push(hashes[i]);
          }
          else {
            emailsArrOfRedeemedTickets.push(emailCurr);
            exDatesOfRedeemedTickets.push(BigNumber.from(await rent.getExpireDate(i, { from: accounts[0] })));
            hashesOfRedeemedTickets.push(hashes[i]);
          }
        }

        const exDatesOfExpiredTickets = [];
        const hashesOfExpiredTickets = await rent.getUserHashOfExpiredTickets({ from: accounts[0] });
        for (let i = 0; i < hashesOfExpiredTickets.length; i++) {
          exDatesOfExpiredTickets.push(BigNumber.from(await rent.getExpireDateOfExpiredTickets(i, { from: accounts[0] })));
        }

        let emailsArrOfExpiredTickets = [];

        for (let i = 0; i < hashesOfExpiredTickets.length; i++) {
          emailsArrOfExpiredTickets.push("Not redeemed");
        }

        for (let i = 0; i < hashesOfExpiredTickets.length; i++) {
          var emailOfExpiredTicket = await selectEmailWeb2(hashesOfExpiredTickets[i]);
          emailsArrOfExpiredTickets[i] = emailOfExpiredTicket === "no_hashes" ? "Not redeemed" : emailOfExpiredTicket;
        }
        setTickets(parseTickets(exDates, hashesOfAvailableTickets, emailsArr)); // available tickets
        setRedeemedTickets(parseTickets(exDatesOfRedeemedTickets, hashesOfRedeemedTickets, emailsArrOfRedeemedTickets));
        setExpiredTickets(parseTickets(exDatesOfExpiredTickets, hashesOfExpiredTickets, emailsArrOfExpiredTickets));
        setLoading(false);

      } catch (err) {
        console.log("Err tickets: " + err);
      }
    }
  }


  async function updateCanRent() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const rentable = await rent.numberOfFreePlacesForAddress(accounts[0]);
        setCanRent(rentable.toNumber());
      } catch (err) {
        console.log("Err RENT: " + err);
      }
    }
  }

  useEffect(() => {
    getTokenBalance();
    GetStakingBalance();
    getRentInfo();
    getTickets();
  }, [])

  useEffect(() => {
    updateCanRent();
  }, [stakedTokens])

  useEffect(() => {
    getTickets();
  }, [rentedPlaces])

  const StakeTokens = async (amountToStake) => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(process.env.REACT_APP_tokenAddress, Token.abi, signer)
      const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);
      console.log(stakingValue);
      let amount = BigNumber.from(10).pow(18).mul(amountToStake);
      console.log(amount);
      try {

        let request = await token.approve(rentContract.address, amount);
        if (!request) throw new Error('Failed to approve transaction');

        await loadingAnimation(request, "Waiting for transaction approval ...");

        request = await rentContract.stakeTokens(amount);
        await loadingAnimation(request, "Waiting for stake ...");

        setBeoTokenBalance(beoTokenBalance - amountToStake);
        setStakedTokens(stakedTokens - (- amountToStake));
        setShowPopup(true);
        setText('You have successfully staked ' + amountToStake + ' BEO');
        setpopupTitle('Info');
        setStakingValue(0);
      } catch (err) {
        console.log("Error: ", err);
        setShowPopup(true);
        setText(err.reason);
        setpopupTitle('Error');
        setStakingValue(0);
      }
    }
  }

  const UnstakeTokens = async (amountToUnstake) => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);
      console.log(amountToUnstake);
      let amount = BigNumber.from(10).pow(18).mul(amountToUnstake);
      console.log(amount);

      try {

        let request = await rentContract.unstakeTokens(amount);

        await loadingAnimation(request, "Waiting for unstake ...");

        setBeoTokenBalance(beoTokenBalance - (-amountToUnstake));
        setStakedTokens(stakedTokens - amountToUnstake);
        getTickets();
        setShowPopup(true);
        setText('You have successfully unstaked ' + amountToUnstake + ' BEO');
        setpopupTitle('Info');
        setStakingValue(0);
      } catch (err) {
        console.log("Error: ", err);
        setShowPopup(true);
        setText(err.reason);
        setpopupTitle('Error');
        setStakingValue(0);
      }
    }
  }

  function listen(provider, numOfPlacesBN, rentPeriodBN) {
    const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, provider);

    rentContract.on('RentPlaceEvent', function () {
      setRentedPlaces(rentedPlaces - (-numOfPlacesBN));
      updateCanRent();
      setLoading(false);
      setShowPopup(true);
      setText('You have successfully rented ' + numOfPlacesBN + ' places for ' + rentPeriodBN + ' days');
      setpopupTitle('Info');
      setRentPeriod(0);
      setRentPlaceCount(0);
    });
  }

  const rentPlaces = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);
      const usdc = new ethers.Contract(process.env.REACT_APP_usdcAddress, USDC.abi, signer);
      console.log(rentPlaceCount);
      console.log(rentPeriod);
      var numOfPlacesBN = BigNumber.from(rentPlaceCount);
      var rentPeriodBN = BigNumber.from(rentPeriod);

      try {
        let price = await rentContract.getAmount();
        let amount = numOfPlacesBN.mul(rentPeriod).mul(BigNumber.from(price)).div(30);

        let request = await usdc.approve(rentContract.address, amount);


        await loadingAnimation(request, "Waiting for transaction approval ...");

        let result = await rentContract.rentSeat(numOfPlacesBN, rentPeriodBN);

        await loadingAnimation(result, "Renting places ...");

        setMsg("Generating tickets ...");
        setLoading(true);
        listen(provider, numOfPlacesBN, rentPeriodBN);

      } catch (err) {
        console.log("Error RENT SEAT : ", err);
        setShowPopup(true);
        setText(err.reason);
        setpopupTitle('Error');
        setRentPeriod(0);
        setRentPlaceCount(0);
      }
    }
  }

  return (
    <>
      {/* <div> */}
      <div className='mainDiv'>
        <Header email={email} avatar={avatar} numberOfUnreadNotifications={numberOfUnreadNotifications} setNumberOfUnreadNotifications={setNumberOfUnreadNotifications} notificationShow={notificationShow} setNotificationShow={setNotificationShow}></Header>
        <div style={{ position: "relative", width: "100%", height: "80%", marginLeft: "2%", marginTop: "1%" }}>
          <div style={{ position: "relative", width: "23%", height: "85%" }}>
            <Dashboard web2={false} unreadNotifications={numberOfUnreadNotifications}></Dashboard>
          </div>
          <Routes>
            <Route path="tickets" element={<Tickets onCardClick={shareTicket} cards={available ? tickets : redeemed ? redeemedTickets : expiredTickets} available={available} redeemed={redeemed} expired={expired} setAvailableCards={setAvailable} setRedeemedCards={setRedeemed} setExpiredCards={setExpired} first={first} setFirst={setFirst}></Tickets>} />
            <Route path="notifications" element={<NotificationCenter setCardInNotificationPopup={setCardInNotificationPopup} setNotificationInNotificationPopup={setNotificationInNotificationPopup} setShowCardPopup={setShowCardPopup} email={email} numberOfUnreadNotifications={numberOfUnreadNotifications} setNumberOfUnreadNotifications={setNumberOfUnreadNotifications} setNotificationShow={setNotificationShow}></NotificationCenter>} />
            {/* <Route path="wallet" element={<MyWallet setShowUnstakePopup={setShowUnstakePopup} stakeTokens={StakeTokens} walletAddress={accountAddress} beoTokenBalance={beoTokenBalance} stakedTokes={stakedTokens}></MyWallet>}></Route> */}
            <Route path="wallet" element={<MyDesks></MyDesks>}></Route>
          </Routes>
        </div>
      </div>
      <CardPopup card={cardInNotificationPopup} notification={notificationInNotificationPopup} showPopup={showCardPopup} skipFunc={setShowCardPopup} func={() => console.log('redeem')}></CardPopup>
      <ConfirmPopup unstakeFunc={UnstakeTokens} buttonColor={"#DA918F"} sell={true} content={"If you proceed, rental credits will be deducted from your account."} buttonText={"SELL CREDITS"} inputTitle={"AMOUNT OF CREDITS TO SELL"} title={"Are you sure you want to sell credits?"} showPopup={showUnstakePopup} connectFunc={() => { console.log("Unstake") }} skipFunc={setShowUnstakePopup}></ConfirmPopup>
      {/* <ConfirmPopup buttonColor={"#0568FD"} sell={false} content={"You can share B123459 with existing BeoDesks user - just type in their account username (email address) below."} buttonText={"SHARE TICKET"} inputTitle={"SHARE WITH"} title={"Share ticket to BeoDesk user?"}showPopup={true} connectFunc={()=>{console.log("A")}} skipFunc={()=>{}}></ConfirmPopup> */}
      {/* <TransactionPopup showPopup={true} numberOfDesks={1} period = {1} price={2}></TransactionPopup> */}
      {/* <SuccessfullTransactionPopup trigger={true} title={'Renting successful'} content={"You successfully rented 1 desk for 1 month. The tickets are available in your dashboard."}></SuccessfullTransactionPopup> */}
      {/* <PopupWithEmail showPopup={true} email={"pera@altlabs.dev"} shareTicket={true}></PopupWithEmail> */}
      {/* <div className='leftDiv'>
          <div className='d-flex profile-div'>
            <img src={profile} alt="profile" className='picture' />
            <div className='row statDiv'>
              <Stat title="BeoToken" val={beoTokenBalance} icon={TbCircles} />
              <Stat title=" Staked" val={stakedTokens} icon={RiHandCoinLine} />
              <Stat title="Rented" val={rentedPlaces} icon={TbArmchair2} />
            </div>
          </div>

          {console.log('Account address: ' + accountAddress)}
          <hr className='line'></hr>
          <div className="mt-2 row" id="stake">
            <InputSpinner
              type={'int'}
              precision={2}
              max={100}
              min={0}
              step={1}
              value={0}
              onChange={num => setStakingValue(num)}
              variant={'dark'}
              size="sm"
            />
              <Popup trigger={showPopup} func = {setShowPopup} content = {text} title = {popupTitle}></Popup>
            <div className='col-sm'>
              <Button id="stakeBtn" variant="outline-dark" onClick={StakeTokens}>Stake</Button>
            </div>
            <div className='col-sm'>
              <Button variant="outline-dark" id="unstakeBtn" onClick={UnstakeTokens}>Unstake</Button>
            </div>
          </div>
          <hr className='line'></hr>

          <div className='mt-2 row'>
            <div className='row' id="places">
              <label className='col-sm myText'>Total places available:</label>
              <label className='col-sm myText'>{canRent}</label>
            </div>
            <div className='mt-2 row myText' id="numberOfPlaces">
              <label className='col-sm myText'>Choose number of places:</label>
              <InputSpinner
                type={'int'}
                precision={2}
                max={100}
                min={0}
                step={1}
                value={0}
                onChange={num => setRentPlaceCount(num)}
                variant={'dark'}
                size="sm"
                id="numberOfPlacesSpin"
              />
            </div>
            <div className='mt-2 row' id="rentPeriod">
              <label className='col-sm myText'>Choose rent period:</label>
              <InputSpinner
                type={'int'}
                precision={2}
                max={100}
                min={0}
                step={1}
                value={0}
                onChange={num => setRentPeriod(num)}
                variant={'dark'}
                size="sm"
                id="rentPeriodSpin"
              />
            </div>
          </div>
          <Button variant="outline-dark" id="rentBtn" style={{ backgroundColor: "black", color: "#8b98ff" }} onClick={rentPlaces}>Rent</Button>
  </div>

          <div className='rightDiv'>
          <p>Mainpage</p>
          <Cards cards={tickets}></Cards>
        </div> */}

    </>
  )
}

export default Mainpage;
