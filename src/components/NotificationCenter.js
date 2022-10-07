import React, { useEffect, useState } from 'react';
import "../style/NotificationCenter.css";
import Notification from './Notification';
import { selectNotificationsWeb2 } from '../web2communication';

const NotificationCenter = ({email}) => {

  const [notifications, setNotifications] = useState([]);

  async function getNotifications(email){
    let notification = await selectNotificationsWeb2(email);
    setNotifications(notification);
    //console.log("Notif " + notification[0]);
  }

  useEffect(()=>{
    getNotifications(email);
  },[])

  return (
    <div style={{position:"absolute", width:"90%", top:"2%", left:"25%", width:"65%", height:"100%"}}>
        <div style={{display: "flex", justifyContent:"space-between"}}>
          <p className='notifications'>Notifications</p>
        </div>
        {/* <Notification></Notification>
        <Notification></Notification> */}
        {
          notifications.map((item) => {
            return (
                <Notification key={item.id} notification={item}></Notification>
            );
        })}
    </div>
   
  )
}

export default NotificationCenter;