import React, { useEffect } from 'react';
import Cards from './Cards';
import Stat from './Stat';
import { useState } from 'react';
import "../style/mainpageStyle.css"
import { BigNumber, ethers } from 'ethers';
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Rent from '../artifacts/contracts/Rent.sol/Rent.json';
import USDC from '../artifacts/contracts/Rent.sol/USDC.json';
import Button from 'react-bootstrap/Button';
// import profileIcon from '../profileIcon.png';
import profile from '../profile.png'
import Loader from './Loader';
import logo from '../mylogo.svg';
import { TbCircles, TbArmchair2 } from 'react-icons/tb';
import { RiHandCoinLine } from 'react-icons/ri'

import InputSpinner from 'react-bootstrap-input-spinner';
import { useNavigate } from 'react-router-dom';

const tokenAddress = "0x22d78c20dc94dE0c7CA065B1FB3a20D957cD5CEA";
const rentAddres = "0x9Fe5b9EAce479434255C8D74759Fc4dE7333D5Ba";
const usdcAddress = "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C";


const Mainpage = ({ accountAddress }) => {

  const [cards, setCards] = useState([]);
  const [beoTokenBalance, setBeoTokenBalance] = useState();
  const [stakedTokens, setStakedTokens] = useState(0);
  const [rentedPlaces, setRentedPlaces] = useState();
  const [canRent, setCanRent] = useState();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState();
  const [msg, setMsg] = useState();
  const [stakingValue, setStakingValue] = useState();
  const [rentPlaceCount, setRentPlaceCount] = useState();
  const [rentPeriod, setRentPeriod] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.ethereum.on("accountsChanged", accounts => {
      console.log(accounts[0] + ' acc');
      if (accounts[0] === accountAddress);
      else navigate('/', { replace: true });
    });
  }, []);

  async function loadingAnimation(request, msg) {
    setMsg(msg);
    setLoading(true);
    await request.wait();
    setLoading(false);
  }

  async function getTokenBalance() {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const token = new ethers.Contract(tokenAddress, Token.abi, provider);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts[0] > 0) {
        const bal = await token.balanceOf(accounts[0]);
        console.log(ethers.utils.formatEther(bal));
        setBeoTokenBalance(Math.trunc(ethers.utils.formatEther(bal)));
      }
      else console.log("greska");
    }
  }

  async function GetStakingBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);

      const rentContract = new ethers.Contract(rentAddres, Rent.abi, provider);

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
      const rent = new ethers.Contract(rentAddres, Rent.abi, signer);

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
  const parseTickets = (expirationDates, hash) => {
    let tmpArr = [];
    for (let i = 0; i < hash.length; i++) {
      tmpArr.push({
        id: parseInt(i + 1),
        expirationDate: new Date(expirationDates[i] * 1000).toLocaleDateString(),
        hash: (hash[i]),
      })
    }
    return tmpArr;
  }

  async function getTickets() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(rentAddres, Rent.abi, provider);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const exDates = [];
        const hashes = await rent.getUserHash({ from: accounts[0] });
        for (let i = 0; i < hashes.length; i++) {
          exDates.push(BigNumber.from(await rent.getExpireDate(i, { from: accounts[0] })));
        }
        for (let i = 0; i < hashes.length; i++) {
          var newDate = new Date(exDates[i] * 1000);
          console.log((newDate.toLocaleDateString() + " " + hashes[i]));
        }
        setTickets(parseTickets(exDates, hashes));

      } catch (err) {
        console.log("Err tickets: " + err);
      }
    }
  }


  async function updateCanRent() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(rentAddres, Rent.abi, signer);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const rentable = await rent.numberOfFreePlacesForAddress(accounts[0]);
        console.log("moze renta " + rentable.toNumber());
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
  }, [])

  useEffect(() => {
    console.log(stakedTokens);
    updateCanRent();
  }, [stakedTokens])

  useEffect(() => {
    getTickets();
  }, [rentedPlaces])

  const StakeTokens = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(tokenAddress, Token.abi, signer)
      const rentContract = new ethers.Contract(rentAddres, Rent.abi, signer);

      let amount = BigNumber.from(10).pow(18).mul(stakingValue);

      console.log(stakingValue);
      console.log(amount.toString());
      try {

        let request = await token.approve(rentContract.address, amount);
        if (!request) throw new Error('Failed to approve transaction');

        await loadingAnimation(request, "Waiting for transaction approval ...");


        console.log("ZAVRSIO APPROVE");
        request = await rentContract.stakeTokens(amount);
        await loadingAnimation(request, "Waiting for stake ...");
        console.log("stake gotov");

        console.log("Cards length: " + cards.length);

        setBeoTokenBalance(beoTokenBalance - stakingValue);
        setStakedTokens(stakedTokens - (- stakingValue));
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  const UnstakeTokens = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(tokenAddress, Token.abi, signer);
      const rentContract = new ethers.Contract(rentAddres, Rent.abi, signer);

      let amount = BigNumber.from(10).pow(18).mul(stakingValue);

      try {

        let request = await rentContract.unstakeTokens(amount);

        await loadingAnimation(request, "Waiting for unstake ...");

        setBeoTokenBalance(beoTokenBalance - (-stakingValue));
        setStakedTokens(stakedTokens - stakingValue);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  const rentPlaces = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(tokenAddress, Token.abi, signer);
      const rentContract = new ethers.Contract(rentAddres, Rent.abi, signer);
      const usdc = new ethers.Contract(usdcAddress, USDC.abi, signer);

      var numOfPlacesBN = BigNumber.from(rentPlaceCount);
      var rentPeriodBN = BigNumber.from(rentPeriod);
      console.log(numOfPlacesBN);
      console.log(rentPeriodBN);

      try {
        let amount = numOfPlacesBN.mul(rentPeriod).mul(BigNumber.from(250)).div(30);
        console.log(amount.toNumber())
        let x = BigNumber.from(10).pow(6).mul(amount);

        let request = await usdc.approve(rentContract.address, x);


        await loadingAnimation(request, "Transfering USDC ...");

        let result = await rentContract.rentSeat(numOfPlacesBN, rentPeriodBN, x);

        await loadingAnimation(result, "Waiting for rent ...");

        console.log("rentovao");
        setRentedPlaces(rentedPlaces + numOfPlacesBN);

      } catch (err) {
        console.log("Error RENT SEAT : ", err);
      }
    }
  }

  return (
    <>
      {loading ? <Loader loading={false} msg={msg} /> : <div className='mainDiv'>
        <div className='topDiv'>
          <img src={logo} id="headerLogo" />
        </div>
        <div className='leftDiv'>
          <div className='d-flex profile-div'>
            <img src={profile} alt="profile" className='picture' />
            <div className='row statDiv'>
              <Stat title="BeoToken" val={beoTokenBalance} icon={TbCircles} />
              <Stat title=" Staked" val={stakedTokens} icon={RiHandCoinLine} />
              <Stat title="Rented" val={rentedPlaces} icon={TbArmchair2} />
            </div>

            <div className='infoDiv'>

              {/* <p className='text myText'>BEO: {beoTokenBalance}</p>
              <p className='text myText'>Staked: {stakedTokens}</p>
              <p className='text myText'>Rented: {rentedPlaces}</p>
              <p className='text myText'>Wallet Address : {accountAddress}</p> */}
            </div>
          </div>

          {console.log('Account address: ' + accountAddress)}
          <hr className='line'></hr>
          {/* <input type="number" id="amount" className='mt-2 form-control'></input> */}
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
              {/* <input className='col-sm' id="numberOfPlaces" type="number"></input> */}
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
              <label className='col-sm myText'>Choose rent preiod:</label>
              {/* <input className='col-sm' id="rentPeriod" type="number"></input> */}
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
          {/* <p>Mainpage</p> */}
          <Cards cards={tickets} />
        </div>
      </div>}
    </>
  )
}

export default Mainpage;