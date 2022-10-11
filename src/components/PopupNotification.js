import React from 'react';
import "../style/PopupNotification.css"

const PopupNotification = ({notification}) => {
    
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
    <div className={`${!notification.received ? 'divMain' : 'divMain_seen'}`}>
        <div className='titleDiv'>
            <div>
                <p className='title'>{notification.title}</p>
            </div>
            <div>
                <p className={`${!notification.received ? 'time_passed' : 'time_passed_seen'}`}>{diff(notification.date)}</p>
            </div>
        </div>
        <div style={{width:"273px"}}>
            <p className='notif_message'>{notification.message}</p>
        </div>
    </div>
  )
}

export default PopupNotification;