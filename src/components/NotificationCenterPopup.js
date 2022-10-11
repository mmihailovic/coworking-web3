import React, { useEffect, useState } from 'react';
import "../style/Header.css";
import PopupNotification from './PopupNotification';
import { selectNotificationsWeb2, viewTicketWeb2 } from '../web2communication';


const NotificationCenterPopup = ({show, email, numberOfUnreadNotifications, setNumberOfUnreadNotifications}) => {

    const [notifications, setNotifications] = useState([]);

    async function getNotifications(email){
        let notification = await selectNotificationsWeb2(email);
        setNotifications(notification);
        //console.log("Notif " + notification[0]);
    }

    useEffect(()=>{
       if(show) getNotifications(email);
       //console.log("Usao")
    },[show, numberOfUnreadNotifications])

    function markAllNotificationsAsRead(){
        notifications.forEach(notification =>{
            viewTicketWeb2(notification.id);
        })
        //setNotifications([...notifications]);
        setNumberOfUnreadNotifications(0);
    }


  return (
    <div id="popup"className="notificationPopup" style={{display:"none"}}>
        <div className="polygon"></div>
        <div className="mainNotificationDiv">
        
        <div className="notificationsDiv">
            <p className="notificationTitle">Notifications</p>
            
            <div className="statusDiv">
                {numberOfUnreadNotifications==0?<p></p>:<p className="unread_count">{numberOfUnreadNotifications} unread</p>}
                <p className="markAllAsRead" onClick={markAllNotificationsAsRead}>Mark all as read</p>
            </div>

            {
                notifications.map((item) => {
                    return (
                        <PopupNotification key={item.id} notification={item}></PopupNotification>
                    );
            })}
            {/* <PopupNotification></PopupNotification> */}
        </div>

        </div>
    </div>
  )
}

export default NotificationCenterPopup