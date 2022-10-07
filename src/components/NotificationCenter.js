import React from 'react';
import "../style/NotificationCenter.css";
import Notification from './Notification';

const NotificationCenter = () => {
  return (
    <div style={{position:"absolute", width:"90%", top:"2%", left:"25%", width:"65%", height:"100%"}}>
        <div>Notifications</div>
        <Notification></Notification>
        <Notification></Notification>
    </div>
   
  )
}

export default NotificationCenter;