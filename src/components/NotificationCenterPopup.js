import React from 'react'
import "../style/Header.css"
import PopupNotification from './PopupNotification'

const NotificationCenterPopup = () => {
  return (
    <div id="popup"className="notificationPopup" style={{display:"none"}}>
        <div className="polygon"></div>
        <div className="mainNotificationDiv">
        
        <div className="notificationsDiv">
            <p className="notificationTitle">Notifications</p>
            
            <div className="statusDiv">
                <p className="unread_count">2 unread</p>
                <p className="markAllAsRead">Mark all as read</p>
            </div>

            <PopupNotification></PopupNotification>
            <PopupNotification></PopupNotification>
            <PopupNotification></PopupNotification>
            {/* <PopupNotification></PopupNotification> */}
        </div>

        </div>
    </div>
  )
}

export default NotificationCenterPopup