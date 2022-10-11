import "../style/Header.css";
import logo from '../assets/beodesks.svg';
import arrow from '../assets/arrow.svg';
import notification from '../assets/Notifications.svg'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/userContext';
import { logoutUser } from '../service/magic';
import PopupNotification from "./PopupNotification";
import NotificationCenterPopup from "./NotificationCenterPopup";
const Header = ({walletAddress, avatar}) => {
  const { email } = useContext(UserContext);
  const history = useNavigate();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      history('/');
    } catch (error) {
      console.error(error);
    }
  };

  const [notificationShow, setNotificationShow] = useState(false);
  const showNotifications = () =>{
    setNotificationShow(!notificationShow);
    const popup = document.getElementById("popup");
    
    if(popup.style.display!=="none")popup.style.display="none";
    else popup.style.display="block";
  }

  return (
    <div className="header">  
        <img src={logo} id="beoseats"></img>
        <span id="whiteCircle"></span>
        {avatar.length > 0 && avatar !== 'user not existing'?<img src={ require('../assets/' + avatar)} style={{position:"absolute", left:"53.46%", top:"26.5%", width:"52%", height:"52%"}}></img>:null}
        <p id="wallet">{walletAddress.substring(0,13) + "..."}</p>
        <div id="notification" onClick={showNotifications}>
        {/* style={{postition:"absolute", left:"50%", backgroundColor:"red", width:"69px", height:"64px"}} */}
            <img id="not_icon"src={notification} alt="notificaiton" width={54} height={54}></img>
            <span className={`${!notificationShow ? 'notificationCirceWhite' : 'notificationCirceBlue'}`}></span>
            <div id="count_div">
              <p id="count">2</p>
            </div>
        </div>
        <NotificationCenterPopup></NotificationCenterPopup>
        {/* <div id="popup"className="notificationPopup" style={{display:"none"}}>
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
            </div>

          </div>
        </div> */}
        <img src={arrow} id="arrow"></img>
        {/* <Button variant="primary" onClick={handleLogOut} style={{position:"absolute",width:"10%",height:"100%", left:"65%"}}>
          Sign Out
        </Button> */}
    </div>
  )
}

export default Header