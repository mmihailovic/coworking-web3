import React, { useEffect } from 'react';
import Cards from './Cards';
import { useState } from 'react';
import "../style/mainpageStyle.css"
import { BigNumber, ethers } from 'ethers';
import Test from '../artifacts/contracts/Test.sol/Test.json';

const adresaContracta = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Mainpage = ({accountAddress}) => {

  const [cards, setCards] = useState([]);

  const deleteCard = async (id) => {
    console.log("Delete ",id);
    
    
    if (typeof window.ethereum !== 'undefined') {

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner(0);
      const contract = new ethers.Contract(adresaContracta, Test.abi, signer)

      try {

        await contract.obrisiOsobu(id);
        setCards(cards.filter((card) => card.adresa!==id));
        console.log(cards);

      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }

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
        <Cards cards = {cards} onDelete={deleteCard}/>
      </div>
    </div>
  )
}

export default Mainpage;