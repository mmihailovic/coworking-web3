import React, { useEffect, useState } from 'react';
import "../style/NotificationCenter.css";
import Notification from './Notification';
import { selectNotificationsWeb2, viewTicketWeb2 } from '../web2communication';

const NotificationCenter = ({email, numberOfUnreadNotifications, setNumberOfUnreadNotifications}) => {

  const [notifications, setNotifications] = useState([]);
  const [rerender, setRerender] = useState(false);

  async function getNotifications(email){
    let notification = await selectNotificationsWeb2(email);
    setNotifications(notification);
    console.log("Notif " + notification[0]);
  }

  useEffect(() => {
    getNotifications(email);
    
  },[rerender])

  useEffect(()=>{
    getNotifications(email);
  },[])

  useEffect(()=>{
    console.log("USAO READ ALL");
    getNotifications(email);
  },[numberOfUnreadNotifications])

  async function markAllNotificationsAsRead(){
    for(let i = 0;i < notifications.length;i++) {
      
      if(notifications[i].received == false) {
        await viewTicketWeb2(notifications[i].id);
      }
    }
    setNumberOfUnreadNotifications(0);
  }


  return (
    <div style={{position:"absolute", width:"90%", top:"2%", left:"25%", width:"65%", height:"100%"}}>
        <div style={{display: "flex", justifyContent:"space-between"}}>
          <p className='notifications'>Notification center</p>
          <p className='markAll' onClick={markAllNotificationsAsRead}>Mark all as read</p>
        </div>
         {/* <Notification></Notification>
        <Notification></Notification> */}
        {
          notifications.map((item) => {
            return (
                <Notification key={item.id} notification={item}  numberOfUnreadNotifications={numberOfUnreadNotifications} setNumberOfUnreadNotifications={setNumberOfUnreadNotifications}></Notification>
            );
        })} 
        
    </div>
    
   
  )
}

export default NotificationCenter;