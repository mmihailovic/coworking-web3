import React, { useEffect } from 'react';
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

import { selectEmailWeb2, insertTicketsWeb2, selectUser,shareTicketWeb2 } from '../web2communication';
import Header from '../components/Header';
import Tickets from '../components/Tickets';
import Dashboard from '../components/Dashboard';
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "https://coworking-khuti.ondigitalocean.app";


const Mainpage = ({ accountAddress, userAvatar}) => {

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
  const [showPopup,setShowPopup] = useState(false);
  const [text,setText] = useState();
  const [popupTitle,setpopupTitle] = useState();
  const [available,setAvailable] = useState(true);
  const [redeemed,setRedeemed] = useState(false);
  const [expired,setExpired] = useState(false);
  const [myBool,setMyBool] = useState(false);
  const [first,setFirst] = useState(true);
  const [avatar,setAvatar] = useState(userAvatar);
  const navigate = useNavigate();

  useEffect(() => {
    window.ethereum.on("accountsChanged", accounts => {
      if (accounts[0] === accountAddress);
      else navigate('/', { replace: true });
    });
  }, []);

  useEffect(() => {
    socket = io(CONNECTION_PORT,{path: '/api/socket.io'});
    socket.emit("user_connected", "mihailjovanoski14@gmail.com");
    socket.on("card_received", (data) => {
      console.log(data);
   })
  }, [CONNECTION_PORT])

  async function shareTicket(hash, email) {
    let request = await shareTicketWeb2(hash,email);
    if(request == 201){
      let data = {
        email: email,
        hash : hash,
      }
      socket.emit("shared_ticket", (data));
    }
  }

  useEffect(()=>{
    if(!myBool)
      setFirst(true);
    else setFirst(false);
  },[myBool])

  useEffect(() => {
    for (let i = 0; i < tickets.length; i++) {
      insertTicketsWeb2(tickets[i].hash, tickets[i].expirationDate);
    }
  }, [tickets])

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
          var email = await selectEmailWeb2(hashes[i]);
          //emailsArr[i] = email === "no_hashes" ? "Not redeemed" : email;
          if(email === "no_hashes") email = "Not redeemed";
          if(email === "Not redeemed") {
            emailsArr.push(email);
            exDates.push(BigNumber.from(await rent.getExpireDate(i, { from: accounts[0] })));
            hashesOfAvailableTickets.push(hashes[i]);
          }
          else {
            emailsArrOfRedeemedTickets.push(email);
            exDatesOfRedeemedTickets.push(BigNumber.from(await rent.getExpireDate(i, { from: accounts[0] })));
            hashesOfRedeemedTickets.push(hashes[i]);
          }
        }

        const exDatesOfExpiredTickets = [];
        const hashesOfExpiredTickets = await rent.getUserHashOfExpiredTickets({from: accounts[0]});
        for(let i = 0; i < hashesOfExpiredTickets.length; i++) {
          exDatesOfExpiredTickets.push(BigNumber.from(await rent.getExpireDateOfExpiredTickets(i,{from:accounts[0]})));
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
        setExpiredTickets(parseTickets(exDatesOfExpiredTickets,hashesOfExpiredTickets,emailsArrOfExpiredTickets));
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
  async function loadAvatar() {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    let myAvatar = await selectUser(accounts[0]);
    setAvatar(myAvatar);  
  }

  useEffect(() => {
    getTokenBalance();
    GetStakingBalance();
    getRentInfo();
    if(!avatar)loadAvatar();
  }, [])

  useEffect(() => {
    updateCanRent();
  }, [stakedTokens])

  useEffect(() => {
    getTickets();
  }, [rentedPlaces])

  const StakeTokens = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(process.env.REACT_APP_tokenAddress, Token.abi, signer)
      const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);
      console.log(stakingValue);
      let amount = BigNumber.from(10).pow(18).mul(stakingValue);
      console.log(amount);
      try {

        let request = await token.approve(rentContract.address, amount);
        if (!request) throw new Error('Failed to approve transaction');

        await loadingAnimation(request, "Waiting for transaction approval ...");

        request = await rentContract.stakeTokens(amount);
        await loadingAnimation(request, "Waiting for stake ...");

        setBeoTokenBalance(beoTokenBalance - stakingValue);
        setStakedTokens(stakedTokens - (- stakingValue));
        setShowPopup(true);
        setText('You have successfully staked ' + stakingValue + ' BEO');
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

  const UnstakeTokens = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rentContract = new ethers.Contract(process.env.REACT_APP_rentAddres, Rent.abi, signer);
      console.log(stakingValue);
      let amount = BigNumber.from(10).pow(18).mul(stakingValue);
      console.log(amount);

      try {

        let request = await rentContract.unstakeTokens(amount);

        await loadingAnimation(request, "Waiting for unstake ...");

        setBeoTokenBalance(beoTokenBalance - (-stakingValue));
        setStakedTokens(stakedTokens - stakingValue);
        getTickets();
        setShowPopup(true);
        setText('You have successfully unstaked ' + stakingValue + ' BEO');
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
          <Header walletAddress={accountAddress} avatar = {avatar}></Header>
          <div style={{position:"relative", width:"100%", height:"80%", marginLeft:"2%", marginTop:"1%"}}>
            <div style={{position:"relative", width:"23%", height:"85%"}}>
              <Dashboard bool={myBool} setmyBool={setMyBool}></Dashboard>
            </div>
            {myBool?null:<Tickets onCardClick={shareTicket} cards={available?tickets:redeemed?redeemedTickets:expiredTickets} available = {available} redeemed = {redeemed} expired = {expired} setAvailableCards = {setAvailable} setRedeemedCards = {setRedeemed} setExpiredCards = {setExpired} first={first} setFirst={setFirst}></Tickets>}
          </div>
        </div>
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
