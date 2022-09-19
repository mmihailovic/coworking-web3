import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code';
import { ethers } from 'ethers';
import Rent from '../artifacts/contracts/Rent.sol/Rent.json';
import "../style/cardStyle.css"
import Button from 'react-bootstrap/Button';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { ViberShareButton, ViberIcon } from 'react-share';
import { CardList } from 'react-bootstrap-icons';
import { EmailIcon, EmailShareButton } from 'react-share';

const Card = ({ card }) => {

  const [canEntry, setCanEntry] = useState(false);
  const rentAddres = "0x0d39e38d03067BD1e902FfB845A5Ef38606d1bB0";
  const dateParts = (card.expirationDate).split("/");
  const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  return (

    <div className='container'>
      <div className='item'>
        <div className='item-right'>
          <h3 className='valid'>Until:</h3>
          <h2 className='num'>{date.getDate()}</h2>
          <p className='day'>{date.toLocaleString('en-US', { month: 'short' })}</p>
          <span className='up-border'></span>
          <span className='down-border'></span>
        </div>

        <div className='item-left'>
          <p className='title'>Enterance ticket</p>
          <h2 className='event'>Redeemed by: {card.email}</h2>

          <div className='item-QR'>
            <div className='item-QR-left'>
              <p className='QR-text'>Exipration date: {date.getDate() + "/" + Number(date.getMonth() - (-1)) + "/" + date.getFullYear()}</p>
              <p className='QR-text'>Address: Masarikova 5, Beograd 11000</p>
            </div>
            <div className='item-QR-right'>
              <QRCode value={card.hash} size={150} />
            </div>
          </div>

          <div className='sce'>
            <FacebookShareButton
              url={'https://coworking-khuti.ondigitalocean.app/?hash=' + card.hash}
              quote={'nesto'}
              hashtag='#BeoSpace'
            >
              <FacebookIcon ></FacebookIcon>
            </FacebookShareButton>

            <WhatsappShareButton
              url={'https://coworking-khuti.ondigitalocean.app/?hash=' + card.hash}>
              <WhatsappIcon></WhatsappIcon>
            </WhatsappShareButton>

            <ViberShareButton
              url={'https://coworking-khuti.ondigitalocean.app/?hash=' + card.hash}
            >
              <ViberIcon></ViberIcon>
            </ViberShareButton>
            <EmailShareButton
              url={'https://coworking-khuti.ondigitalocean.app/?hash=' + card.hash}
            >
              <EmailIcon></EmailIcon>
            </EmailShareButton>

          </div>
        </div>

      </div>
    </div>

    // <div style={{border: '2px dotted', marginTop:'10px'}}>

    //   <div style={{float: 'left'}}>
    //     <p>{card.id}</p>
    //     <p>{card.expirationDate}</p>
    //   </div>
    //   <QRCode   
    //         value={card.hash}
    //         size={150}
    //       />
    // </div>
  )
}

export default Card
