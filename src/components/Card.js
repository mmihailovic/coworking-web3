import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code';
import { ethers } from 'ethers';
import Rent from '../artifacts/contracts/Rent.sol/Rent.json';

const Card = ({card}) => {

  const [canEntry, setCanEntry] = useState(false);
  const rentAddres = "0x52DF7ce54dEE3B01aF137C3777f7F9F27fB77C73";


  async function getInfo() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const rent = new ethers.Contract(rentAddres, Rent.abi, signer);
      try{
        let result = await rent.ulaz(card.hash);
        setCanEntry(result);
      }catch(err){
        console.log("Err rent: " + err);
      }
    }
  }

  useEffect(() => {
    getInfo();
  },[])

  return (
    <div style={{border: '2px dotted', marginTop:'10px'}}>
     
      <div style={{float: 'left'}}>
        <p>{card.id}</p>
        <p>{card.expirationDate}</p>
      </div>
      <QRCode   
            value={canEntry.toString()}
            size={150}
          />
    </div>
  )
}

export default Card
