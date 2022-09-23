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

const Card = ({ card }) => {

  const [canEntry, setCanEntry] = useState(false);
  const rentAddres = "0x0d39e38d03067BD1e902FfB845A5Ef38606d1bB0";
  const dateParts = (card.expirationDate).split("/");
  //const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  let redeemd = false;
  let expired = false;

  return (
    <div className={`${!expired ? 'primary_container' : 'primary_container_expired'}`}>

      <div className="secondary_container">
        <div className="left">
          <div className="beo_spaces_div">
            <div className='beo_space_second_div'>
              <p className="text1">BeoSeats</p>
              {expired ? <div id="expired_div"><p className='text3' id="expired"> Expired </p></div> : <></>}
            </div>
            {redeemd ? <></> : <button type="button" className="redeem_btn">Redeem</button>}
          </div>
          <div className="address_div">
            <img alt='map_marker' src={mapMarker} className="icon" />
            <p className="text2">Masarikova 5, Beograd</p>
          </div>
          <div className="date_div">
            <img alt='calendar_icon' src={calendarIcon} className="icon" />
            <p className="text2">Expires: 29/09/2022</p>
          </div>
          <div className="redeem_div">
            <img alt="user icon" src={userIcon} className="icon" />
            {redeemd ? <p className='text2'>Petar Petrovic</p> : <div id="available_div"><p className="text2">Available</p></div>}
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
          <img className="QRcode" src={QRcode} alt="QRcode" />
        </div>
      </div>
    </div>
  );
}

export default Card