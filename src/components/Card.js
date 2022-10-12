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
import QRcode from "../assets/qrcode.png"
import mapMarker from "../assets/map-marker.svg"
import calendarIcon from "../assets/calendar.svg"
import userIcon from "../assets/user.svg"
import { QRCodeSVG } from 'qrcode.react';

const Card = ({ card, redeemd, expired, onCardClick }) => {

  const [canEntry, setCanEntry] = useState(false);
  const rentAddres = "0x0d39e38d03067BD1e902FfB845A5Ef38606d1bB0";
  const dateParts = (card.expirationDate).split("/");

  return (
    <div className={`${!expired ? 'primary_container' : 'primary_container_expired'}`}>

      <div className="secondary_container">
        <div className="left">
          <div className="beo_spaces_div">
            <div className='beo_space_second_div'>
              <p className={`${!expired ? 'text1' : 'text1-dark'}`}>BeoDesks</p>
              {expired ? <div id="expired_div"><p className='text3' id="expired"> Expired </p></div> : <></>}
            </div>
            {false ? <></> : <button type="button" onClick={() => onCardClick(card.hash)} className="redeem_btn">Redeem</button>}
          </div>
          <div className="address_div">
            {/* <img alt='map_marker' src={mapMarker} className="icon" /> */}
            {/* <div className='imgDiv'></div> */}
            <img alt='map_marker' src={mapMarker} className="icon" />
            <p className="text2">Masarikova 5, Beograd</p>
          </div>
          <div className="date_div">
            <img alt='calendar_icon' src={calendarIcon} className="icon" />
            <p className="text2">Expires: {dateParts[0] + "." + dateParts[1] + "." + dateParts[2]}</p>
          </div>
          <div className="redeem_div">
            <img alt="user icon" src={userIcon} className="icon" />
            {card.email !== 'Not redeemed' ? <p className='text2'>{card.email}</p> : <div id="available_div"><p className="available">Available</p></div>}
            {redeemd ? <div className="copy_mail_div">
              <p className="text3">Copy email</p>
            </div> : <></>}
          </div>
        </div>
        <div className="mid">
          <div className={`${!expired ? 'circle_div_up' : 'circle_div_up_expired'}`}></div>
          <div className="dotted"></div>
          <div className={`${!expired ? 'circle_div_down' : 'circle_div_down_expired'}`}></div>
        </div>
        <div className="right">
          {/* <img className="QRcode" src={QRcode} alt="QRcode" /> */}
          {/* <div style={{ height: "auto", maxWidth: "80%", width: "80%", backgroundColor: "red" }}>
            
          </div> */}
          {/* <QRCode value={card.hash} className="QRcode" /> */}

          <QRCodeSVG
            value={card.hash}
            className="QRcode"
          />

        </div>
        {/* <input type="text" id="fname" name="fname">mihailjovanoski14@gmail</input> */}
      </div>
    </div>
  );
}

export default Card