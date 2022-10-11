import "../style/Header.css";
import logo from '../assets/beodesks.svg';
import arrow from '../assets/arrow.svg';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/userContext';
import { logoutUser } from '../service/magic';
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
  return (
    <div className="header">  
        <img src={logo} id="beoseats"></img>
        <span id="whiteCircle"></span>
        {avatar != null && avatar.length > 0 && avatar !== 'user not existing'?<img src={ require('../assets/' + avatar)} style={{position:"absolute", left:"53.46%", top:"26.5%", width:"52%", height:"52%"}}></img>:null}
        <p id="wallet">{walletAddress.substring(0,13) + "..."}</p>
        <img src={arrow} id="arrow"></img>
        <Button variant="primary" onClick={handleLogOut} style={{position:"absolute",width:"10%",height:"100%", left:"65%"}}>
          Sign Out
        </Button>
    </div>
  )
}

export default Header