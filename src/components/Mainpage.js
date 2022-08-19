import React, { useEffect } from 'react';
import Cards from './Cards';
import { useState } from 'react';
import "../style/mainpageStyle.css"
import { BigNumber, ethers } from 'ethers';
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Rent from '../artifacts/contracts/Rent.sol/Rent.json';
import USDC from '../artifacts/contracts/Rent.sol/USDC.json';
import Button from 'react-bootstrap/Button';
import profileIcon from '../profileIcon.png';

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



  async function getTokenBalance() {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const token = new ethers.Contract(tokenAddress, Token.abi, provider);
      //const bal = await token.balanceOf(accountAddress);
      //console.log(ethers.utils.formatEther(bal));
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
    if( typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);

      const rentContract = new ethers.Contract(rentAddres, Rent.abi, provider);

      try{
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        const stakeBal = await rentContract.getStakingBalance(accounts[0]);
        //console.log(Math.trunc(ethers.utils.formatEther(stakeBal))+ ' stake ');
        const x = Math.trunc(ethers.utils.formatEther(stakeBal));
        setStakedTokens(x);

        const rented = await rentContract.numberOfRentedPlacesForAddress(accounts[0]);
        setRentedPlaces(rented.toNumber());

        //const rentable = await rentContract.numberOfPlacesForAddress(BigNumber.from(10).pow(18).mul(stakedTokens));
        //console.log("moze renta " + rentable.toNumber());
        //setCanRent(rentable.toNumber());

      }catch(err){
        console.log("Err: " + err);
      }
      
    }
  }

  async function getRentInfo() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(rentAddres, Rent.abi, signer);

      try{
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const rented = await rent.numberOfRentedPlacesForAddress(accounts[0]);
        setRentedPlaces(rented.toNumber());
      }catch(err){
        console.log("Err rent: " + err);
      }
    }
  }
  const parseTickets = (expirationDates, hash) => {
      let tmpArr = [];
      for (let i = 0; i < hash.length; i++) {
        tmpArr.push({
          id: parseInt(i+1),
          expirationDate: new Date(expirationDates[i]*1000).toLocaleDateString(),
          hash: (hash[i]),
        })
      }
      return tmpArr;
  }

  async function getTickets() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(rentAddres, Rent.abi, provider);

      try{
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        //const [expirationDates, hash] = await rent.getRents({from: accounts[0]});
        const exDates = [];
        const hashes = await rent.getUserHash({from: accounts[0]});
        for(let i = 0;i < hashes.length; i++) {
            exDates.push(BigNumber.from(await rent.getExpireDate(i, {from: accounts[0]})));
        }
        //await rented.wait();
        for(let i=0; i< hashes.length; i++){
          var newDate = new Date(exDates[i]*1000);
          console.log((newDate.toLocaleDateString()+" "+hashes[i]));
        }
        //console.log("rented "   + hash.length);
        setTickets(parseTickets(exDates, hashes));

      }catch(err){
        console.log("Err tickets: " + err);
      }
    }
  }


  async function updateCanRent() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(rentAddres, Rent.abi, signer);

      try{
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const rentable = await rent.numberOfFreePlacesForAddress(accounts[0]);
        console.log("moze renta " + rentable.toNumber());
        setCanRent(rentable.toNumber());
      }catch(err){
        console.log("Err RENT: " + err);
      }
    }
  }

  useEffect(() => {
    //let [res1,res2,res3] = await Promise.all([getTokenBalance(), GetStakingBalance(), getRentInfo()]);
    //promise();
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

      var amount = document.getElementById("amount").value;
      let x = BigNumber.from(10).pow(18).mul(amount);

      console.log(amount);
      console.log(x.toString());
      try {
        
        let request = await token.approve(rentContract.address, x);
        if(!request)throw new Error('Failed to approve transaction');

        //let res = await checkTx(request.hash, provider);
        
        await request.wait();
        console.log("ZAVRSIO APPROVE");
        request = await rentContract.stakeTokens(x);
        //res = await checkTx(request.hash, provider);
        await request.wait();
        console.log("stake gotov");

        console.log("Cards length: " + cards.length);

        setBeoTokenBalance(beoTokenBalance - amount);
        setStakedTokens(stakedTokens -(- amount));
        // let accountAddressExists = false;
        // cards.forEach(card => {
        //   if (card.accountAddress == accountAddress) {
        //     card.amount = '' + (Number(card.amount) + Number(amount));
        //     accountAddressExists = true;
        //     setCards([...cards]);
        //   }
        // })

        // if (!accountAddressExists) {
        //   let card = {
        //     cardId: cards.length + 1,  //kad se budu brisale kartice treba uzeti najveci id, a ne cards.length
        //     accountAddress: accountAddress,
        //     amount: amount
        //   };
          //console.log(stakedTokens);
          //setCards([...cards, card]);
        //}

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

      var amount = document.getElementById("amount").value;
      let x = BigNumber.from(10).pow(18).mul(amount);

      try {

        let request = await rentContract.unstakeTokens(x);

        await request.wait();

        // let shouldDeleteCard = false;
        // cards.forEach(card => {
        //   if (card.accountAddress == accountAddress) {
        //     if (card.amount == amount) shouldDeleteCard = true;
        //     card.amount = '' + (Number(card.amount) - Number(amount));
        //     setCards([...cards]);
        //   }
        // })

        // if (shouldDeleteCard) setCards(cards.filter((card) => card.accountAddress !== accountAddress));

        setBeoTokenBalance(beoTokenBalance - (-amount));
        setStakedTokens(stakedTokens - amount);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  // const parseBackend = (adrese, imena, prezimena) => {

  //   let tmpArr = [];

  //   for (let i = 0; i < imena.length; i++) {
  //     tmpArr.push({
  //       adresa: parseInt(adrese[i]),
  //       ime: imena[i],
  //       prezime: prezimena[i],
  //     })
  //   }

  //   return tmpArr;
  // }

  // async function getPersons() {

  //   if (typeof window.ethereum !== 'undefined') {

  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     //console.log({ provider })
  //     const contract = new ethers.Contract(adresaContracta, Test.abi, provider)

  //     try {

  //       const [adrese, imena, prezimena] = await contract.getPeople();
  //       setCards(parseBackend(adrese,imena,prezimena));

  //     } catch (err) {
  //       console.log("Error: ", err)
  //     }
  //   }    
  // }

  // useEffect(() => {
  //   getPersons();
  // }, []);

  const rentPlaces = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(tokenAddress, Token.abi, signer);
      const rentContract = new ethers.Contract(rentAddres, Rent.abi, signer);
      const usdc = new ethers.Contract(usdcAddress, USDC.abi, signer);

      var numOfPlaces = BigNumber.from(document.getElementById("numberOfPlaces").value);
      var rentPeriod = BigNumber.from(document.getElementById("rentPeriod").value);


      try {
        let amount = numOfPlaces.mul(rentPeriod).mul(BigNumber.from(250)).div(30);
        console.log(amount.toNumber())
        let x = BigNumber.from(10).pow(6).mul(amount);

        let request = await usdc.approve(rentContract.address, x);

        await request.wait();

        let result = await rentContract.rentSeat(numOfPlaces, rentPeriod, x);
        await result.wait();
        console.log("rentovao");
        setRentedPlaces(rentedPlaces + numOfPlaces);
        
      } catch (err) {
        console.log("Error RENT SEAT : ", err);
      }
    }
  }

  return (
    <div>
      <div className='leftDiv'>
        <div className='d-flex justify-content-around'>
          <img src={profileIcon}  alt="profile" />
          <div className='d-flex flex-column'>
            <div className='p-2'>
              <label className='label label-info'>BEO:</label>
              <label>{beoTokenBalance}</label>
            </div>
            <div className='p-2'>
              <label>Staked:</label>
              <label>{stakedTokens}</label>
            </div>
            <div className='p-2'>
              <label>Rented:</label>
              <label>{rentedPlaces}</label>
            </div>    
          </div>
        </div>
        <p>{accountAddress}</p>
        {console.log('Account address: ' + accountAddress)}
       
        <input type="number" id="amount" className='mt-2 form-control'></input>
        <div className="mt-2 row">
          <div className='col-sm'>
            <Button className='btn btn-primary' id="stakeBtn" onClick={StakeTokens}>Stake</Button>
          </div>
          <div className='col-sm'>
            <Button className='btn btn-primary' id="unstakeBtn" onClick={UnstakeTokens}>Unstake</Button>
          </div>
        </div>
        
        <div className='mt-2 row'>
          <div className='row'>
            <label className='col-sm'>Total places available:</label>
            <label className='col-sm'>{canRent}</label>
          </div>
          <div className='mt-2 row'>
            <label className='col-sm'>Choose number of places:</label>
            <input className='col-sm'id="numberOfPlaces" type="number"></input>
          </div>
          <div className='mt-2 row'>
            <label className='col-sm'>Choose rent preiod:</label>
            <input className='col-sm' id="rentPeriod" type="number"></input>
          </div>
        </div>
        <button className='btn col-3 btn-primary mt-2' onClick={rentPlaces}>Rent</button>
      </div>

      <div className='rightDiv'>
        {/* <p>Mainpage</p> */}
        <Cards cards={tickets} />
      </div>
    </div>
  )
}

export default Mainpage;