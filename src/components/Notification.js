import React, { useEffect, useState } from 'react';
import "../style/NotificationStyle.css";
import icon_seen from "../assets/avatar1.svg";
import icon from "../assets/avatar2.svg";
import { viewTicketWeb2 } from '../web2communication';

const Notification = ({ notification, rerender,numberOfUnreadNotifications, setNumberOfUnreadNotifications }) => {

  const [received, setReceived] = useState(notification.received);

  async function viewTicket(){
    //console.log("Notification " + notification.id);
    if(received == 0){
      await viewTicketWeb2(notification.id);
    //notification.received = true;
    setReceived(true);
    setNumberOfUnreadNotifications(numberOfUnreadNotifications - 1);
    }
    //this.forceUpdate();
  }

  useEffect(()=>{
    //if(rerender)setReceived(true);
    if(numberOfUnreadNotifications==0)setReceived(true)
  },[numberOfUnreadNotifications])

  function diff(date){
    let today = new Date();
    let notifDate = new Date(date);
    var diffMs = Math.abs(notifDate - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if(diffDays == 0){
      if(diffHrs==0)return diffMins+"min ago";
      return diffHrs+"hrs ago"
    }
    return diffDays+"days ago";
  }

  return (
    <div className={`${!received ? 'notification_div' : 'notification_div_seen'}`}>
        <div className='main_div'>
          <div className="icon_div">
              <img src={`${!received ? icon : icon_seen}`} alt='icon' height={80}></img>
          </div>
          <div className='title_div'>
              <p className={`${!received ? 'title' : 'title_seen'}`}>{notification.title}</p>
              <p className={`${!received ? 'message' : 'message_seen'}`}>{notification.message}</p>
          </div>
          <div className='stat_div'>
              <p className='time'>{diff(notification.date)}</p>
              <p className={`${!received ? 'view_ticket' : 'view_ticket_seen'}`} onClick={viewTicket}>View ticket</p>
          </div>
        </div>
    </div>
  )
}

export default Notification;