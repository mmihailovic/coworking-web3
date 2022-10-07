import React from 'react';
import "../style/NotificationStyle.css";
import icon_seen from "../assets/avatar1.svg";
import icon from "../assets/avatar2.svg";

const received = false;
const Notification = ({ notification }) => {
  return (
    <div className={`${!received ? 'notification_div' : 'notification_div_seen'}`}>
        <div className='main_div'>
          <div className="icon_div">
              <img src={`${!received ? icon : icon_seen}`} alt='icon' height={80}></img>
          </div>
          <div className='title_div'>
              <p className={`${!received ? 'title' : 'title_seen'}`}>Title</p>
              <p className={`${!received ? 'message' : 'message_seen'}`}>Your ticket B6411264 is expiring in 2 days!</p>
          </div>
          <div className='stat_div'>
              <p className='time'>5min ago</p>
              <p className={`${!received ? 'view_ticket' : 'view_ticket_seen'}`}>View ticket</p>
          </div>
        </div>
    </div>
  )
}

export default Notification;