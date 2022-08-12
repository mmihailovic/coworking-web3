import React, { useEffect } from 'react';
import Cards from './Cards';
import { useState } from 'react';
import "../style/mainpageStyle.css"
import { BigNumber, ethers } from 'ethers';
import Test from '../artifacts/contracts/Test.sol/Test.json';

const adresaContracta = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

const Mainpage = ({accountAddress}) => {

  const [cards, setCards] = useState([]);

  const parseBackend = (adrese, imena, prezimena) => {

    let tmpArr = [];

    for(let i = 0; i < imena.length; i++)
    {
        tmpArr.push({
          adresa: parseInt(adrese[i]),
          ime: imena[i],
          prezime: prezimena[i],
        })
    }

    return tmpArr;
  }

  async function getPersons() {

    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //console.log({ provider })
      const contract = new ethers.Contract(adresaContracta, Test.abi, provider)

      try {

        const [adrese, imena, prezimena] = await contract.getPeople();
        setCards(parseBackend(adrese,imena,prezimena));

      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
  
  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div>
      <div className='leftDiv'>
        <p>{accountAddress}</p>
        {console.log('Account address: ' + accountAddress)}
      </div>
      <div className='rightDiv'>
        <p>Mainpage</p>
        <Cards cards = {cards}/>
      </div>
    </div>
  )
}

export default Mainpage;