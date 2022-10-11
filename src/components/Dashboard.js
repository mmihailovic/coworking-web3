import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Dashboard.css";
import ticket from '../assets/ticket-2.svg'
import monitorDesktop from '../assets/monitor-desktop.svg'
import monitorDesktopGreen from '../assets/monitor-desktopGreen.svg'
import ticketGreen from '../assets/ticket-2Green.svg'
import wallet from '../assets/Wallet.svg';
import walletGreen from '../assets/WalletGreen.svg';

function Dashboard({ web2, unreadNotifications }) {
  const navigate = useNavigate();

  useEffect(() => {
    var btn1 = document.getElementById("btn1");
    document.getElementById("img1").src = ticketGreen;
    btn1.classList.add('inactive');

  }, []);

  function seatRentalsChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    btn1.classList.add('inactive');
    btn2.classList.remove('inactive');
    btn3.classList.remove('inactive');
    document.getElementById("img1").src = monitorDesktopGreen;
    document.getElementById("img2").src = ticket;
    document.getElementById("img3").src = wallet;
    if (web2) navigate('/login/tickets');
    else navigate('/main/tickets');
  }

  function myTicketsChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    //btn2.classList.add('inactive');
    btn1.classList.remove('inactive');
    btn3.classList.remove('inactive');
    document.getElementById("img1").src = monitorDesktop;
    document.getElementById("img2").src = ticketGreen;
    document.getElementById("img3").src = wallet;
    if (web2) navigate('/login/notifications');
    else navigate('/main/notifications');
  }

  function walletChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    btn3.classList.add('inactive');
    btn2.classList.remove('inactive');
    btn1.classList.remove('inactive');
    document.getElementById("img1").src = monitorDesktop;
    document.getElementById("img2").src = ticket;
    document.getElementById("img3").src = walletGreen;
    if (web2) navigate('/login/wallet');
    else navigate('/main/wallet');
  }

  return (
    <div className="container">
      <div className='buttonContainer' id="btn1Container"><button id='btn1' onClick={seatRentalsChange}><img id="img1" src={monitorDesktop} alt='?' />My tickets</button></div>
      <div className='notificationButtonContainer' id="btn2Container">
        <button id='btn2' onClick={myTicketsChange}><img id="img2" src={ticket} alt='?' />Notifications</button>
        {unreadNotifications > 0 ? <div className='notification'>{unreadNotifications}</div> : <></>}
      </div>
      <div className='buttonContainer' id="btn3Container"><button id='btn3' onClick={walletChange}><img id="img3" src={wallet} />Wallet</button></div>
      <div className="bottomDiv">
        <p id="coworkingSpace">Co-working space</p>
        <p id="dashboardPar">dashboard</p>
      </div>
    </div>
  )
}
export default Dashboard