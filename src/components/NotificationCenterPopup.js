import React, { useEffect, useState } from 'react';
import "../style/Header.css";
import PopupNotification from './PopupNotification';
import { selectNotificationsWeb2, viewTicketWeb2 } from '../web2communication';


const NotificationCenterPopup = ({show, email}) => {

    const [notifications, setNotifications] = useState([]);

    async function getNotifications(email){
        let notification = await selectNotificationsWeb2(email);
        setNotifications(notification);
        console.log("Notif " + notification[0]);
    }

    useEffect(()=>{
       if(show) getNotifications(email);
       //console.log("Usao")
    },[show])

    function markAllNotificationsAsRead(){
        notifications.forEach(notification =>{
            viewTicketWeb2(notification.id);
        })
    }


  return (
    <div id="popup"className="notificationPopup" style={{display:"none"}}>
        <div className="polygon"></div>
        <div className="mainNotificationDiv">
        
        <div className="notificationsDiv">
            <p className="notificationTitle">Notifications</p>
            
            <div className="statusDiv">
                <p className="unread_count">2 unread</p>
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