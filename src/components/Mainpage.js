import React, { useEffect } from 'react';
import Cards from './Cards';
import { useState } from 'react';
import "../style/mainpageStyle.css"
import { BigNumber, ethers } from 'ethers';
import Test from '../artifacts/contracts/Test.sol/Test.json';
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Vendor from '../artifacts/contracts/Vendor.sol/Vendor.json';

const vendorAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const tokenAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

const Mainpage = ({ accountAddress }) => {

  const [cards, setCards] = useState([]);

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
      }
      else console.log("greska");
    }
  }

  useEffect(() => {
    getTokenBalance();
  }, [])

  const StakeTokens = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(tokenAddress, Token.abi, signer)
      const vendorContract = new ethers.Contract(vendorAddress, Vendor.abi, signer);

      var amount = document.getElementById("amount").value;
      let x = BigNumber.from(10).pow(18).mul(amount);

      console.log(amount);
      try {
        let request = await token.approve(vendorContract.address, x);

        request = await vendorContract.stakeTokens(x);

        console.log("Cards length: " + cards.length);

        let accountAddressExists = false;
        cards.forEach(card => {
          if (card.accountAddress == accountAddress) {
            card.amount = '' + (Number(card.amount) + Number(amount));
            accountAddressExists = true;
            setCards([...cards]);
          }
        })

        if (!accountAddressExists) {
          let card = {
            cardId: cards.length + 1,  //kad se budu brisale kartice treba uzeti najveci id, a ne cards.length
            accountAddress: accountAddress,
            amount: amount
          };

          setCards([...cards, card]);
        }

      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  const UnstakeTokens = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const token = new ethers.Contract(tokenAddress, Token.abi, signer)
      const vendorContract = new ethers.Contract(vendorAddress, Vendor.abi, signer);

      var amount = document.getElementById("amount").value;
      let x = BigNumber.from(10).pow(18).mul(amount);

      try {

        await vendorContract.unstakeTokens(x);

        let shouldDeleteCard = false;
        cards.forEach(card => {
          if (card.accountAddress == accountAddress) {
            if (card.amount == amount) shouldDeleteCard = true;
            card.amount = '' + (Number(card.amount) - Number(amount));
            setCards([...cards]);
          }
        })

        if (shouldDeleteCard) setCards(cards.filter((card) => card.accountAddress !== accountAddress));

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



  return (
    <div>
      <div className='leftDiv'>
        <p>{accountAddress}</p>
        {console.log('Account address: ' + accountAddress)}
        <input type="number" id="amount"></input>
        <div className="row ">
          <button type="button" id="stakeBtn" onClick={StakeTokens}>Stacke</button>
          <button type="button" id="unstakeBtn" onClick={UnstakeTokens}>Unstake</button>
        </div>
      </div>
      <div className='rightDiv'>
        {/* <p>Mainpage</p> */}
        <Cards cards={cards} />
      </div>
    </div>
  )
}

export default Mainpage;