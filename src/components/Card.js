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

const Card = ({ card, redeemd, expired, onCardClick, received, expiring }) => {
  const [canEntry, setCanEntry] = useState(false);
  const rentAddres = "0x0d39e38d03067BD1e902FfB845A5Ef38606d1bB0";
  // const dateParts = (card.expirationDate).split("/");
  const myavailable = false;

  return (
    <div className={`${received?'primary_container_redeem':expiring?'primary_container_expiring':!expired ? 'primary_container' : 'primary_container_expired'}`}>

      <div className="secondary_container">
        <div className={`${received || expiring?'leftpopup':"left"}`}>
          <div className="beo_spaces_div">
            <div className={`${received || expiring?'beo_space_second_div_popup':'beo_space_second_div'}`}>
              <p className={`${!expired ? 'text1' : 'text1-dark'}`}>BeoDesks</p>
              {expired ? <div id="expired_div"><p className='text3' id="expired"> Expired </p></div> : expiring?<div id="expired_div_popup"><p className='text3' id="expired_popup"> Expiring </p></div>:<></>}
            </div>
            {false ? <></> : <button type="button" onClick={() => onCardClick(card.hash)} className="redeem_btn">Redeem</button>}
          </div>
          <div className={`${received || expiring?'address_div_popup':"address_div"}`}>
            {/* <img alt='map_marker' src={mapMarker} className="icon" /> */}
            {/* <div className='imgDiv'></div> */}
            <img alt='map_marker' src={mapMarker} className={`${received?'icon':"icon"}`} />
            <p className={`${received || expiring?'text2-popup':"text2"}`}>Masarikova 5, Beograd</p>
          </div>
          <div className={`${received || expiring?'date_div_popup':"date_div"}`}>
            <img alt='calendar_icon' src={calendarIcon} className={`${received || expiring?'icon':"icon"}`} />
            {/* <p className="text2">Expires: {dateParts[0] + "." + dateParts[1] + "." + dateParts[2]}</p> */}
            <p className={`${received || expiring?'text2-popup':"text2"}`}>Expires: 14/01/2002</p>
          </div>
          <div className={`${received || expiring?'redeem_div_popup':"redeem_div"}`}>
            <img alt="user icon" src={userIcon} className={`${received || expiring?'icon':"icon"}`} />
            {/* {card.email !== 'Not redeemed' ? <p className='text2'>{card.email}</p> : <div id="available_div"><p className="available">Available</p></div>} */}
            {myavailable?<p className={`${received || expiring?'text2-popup':'text2'}`}>mmihailovic21@gmail.com</p>:<div id={`${received || expiring?'available_div_popup':"available_div"}`}><p className={`${received || expiring?'available_popup':"available"}`}>Available</p></div>}
            {redeemd ? <div className="copy_mail_div">
              <p className="text3">Copy email</p>
            </div> : <></>}
          </div>
        </div>
        <div className="mid">
          <div className={`${received?'circle_div_up_redeem':expiring?'circle_div_up_expiring':!expired ? 'circle_div_up' : 'circle_div_up_expired'}`}></div>
          <div className={`${received || expiring?'dotted-popup':"dotted"}`}></div>
          <div className={`${received?'circle_div_down_redeem':expiring?'circle_div_down_expiring':!expired ? 'circle_div_down' : 'circle_div_down_expired'}`}></div>
        </div>
        <div className={`${received || expiring?'rightpopup':"right"}`}>
          {/* <img className="QRcode" src={QRcode} alt="QRcode" /> */}
          {/* <div style={{ height: "auto", maxWidth: "80%", width: "80%", backgroundColor: "red" }}>
            
          </div> */}
          {/* <QRCode value={card.hash} className="QRcode" /> */}

          <QRCodeSVG
            value="{card.hash}"
            className="QRcode"
          />

        </div>
        {/* <input type="text" id="fname" name="fname">mihailjovanoski14@gmail</input> */}
      </div>
    </div>
  );
}

export default Card