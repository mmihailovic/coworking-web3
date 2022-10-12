import React, { useEffect, useState } from 'react';
import "../style/Header.css";
import PopupNotification from './PopupNotification';
import { selectNotificationsWeb2, viewTicketWeb2 } from '../web2communication';
import PopupNotifications from './PopupNotifications';


const NotificationCenterPopup = ({show, email, numberOfUnreadNotifications, setNumberOfUnreadNotifications}) => {

    const [notifications, setNotifications] = useState([]);

    async function getNotifications(email){
        let notification = await selectNotificationsWeb2(email);
        setNotifications(notification);
        //console.log("Notif " + notification[0]);
    }

    useEffect(()=> {
        getNotifications(email);
    },[])
    useEffect(()=> {
        getNotifications(email);

    },[numberOfUnreadNotifications])

    async function markAllNotificationsAsRead(){
        for(let i = 0; i < notifications.length; i++) {
            if(notifications[i].received == false) {
                await viewTicketWeb2(notifications[i].id);
                console.log(notifications[i].received);
            }
        }
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
            <PopupNotifications notifications={notifications}></PopupNotifications>
            {/* <PopupNotification></PopupNotification> */}
        </div>

        </div>
    </div>
  )
}

export default NotificationCenterPopup