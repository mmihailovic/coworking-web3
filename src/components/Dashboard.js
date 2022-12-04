import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Dashboard.css";
import ticket from '../assets/ticket-2.svg'
import notification from "../assets/notification.svg"
import notificationGreen from "../assets/notificationGreen.svg"

import ticketGreen from '../assets/ticket-2Green.svg'
import wallet from '../assets/Wallet.svg';
import walletGreen from '../assets/WalletGreen.svg';

function Dashboard({ web2, unreadNotifications }) {
  const navigate = useNavigate();

  useEffect(() => {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn4"); //ovo
    document.getElementById("img1").src = ticketGreen;
    btn1.classList.add('inactive');
    btn2.classList.add('btnActive');
    btn3.classList.add('btnActive');
    btn4.classList.add('btnActive');


    var btnContainer2 = document.getElementById("btn2Container");
    btnContainer2.classList.add('btnContainerActive');
    var btnContainer3 = document.getElementById("btn3Container");
    btnContainer3.classList.add('btnContainerActive');
    var btnContainer4 = document.getElementById("btn4Container"); //ovo
    btnContainer4.classList.add('btnContainerActive'); //ovo


  }, []);

  function seatRentalsChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn3"); //ovo

    btn1.classList.remove('btnActive');
    btn2.classList.add('btnActive');
    btn3.classList.add('btnActive');
    btn4.classList.add('btnActive');

    btn1.classList.add('inactive');
    btn2.classList.remove('inactive');
    btn3.classList.remove('inactive');
    btn4.classList.remove('inactive'); //ovo
    document.getElementById("img1").src = ticketGreen;
    document.getElementById("img2").src = notification;
    document.getElementById("img3").src = wallet;


    var btnContainer1 = document.getElementById("btn1Container");
    btnContainer1.classList.remove('btnContainerActive');
    var btnContainer2 = document.getElementById("btn2Container");
    btnContainer2.classList.add('btnContainerActive');
    var btnContainer3 = document.getElementById("btn3Container");
    btnContainer3.classList.add('btnContainerActive');

    var btnContainer4 = document.getElementById("btn4Container"); //ovo
    btnContainer4.classList.add('btnContainerActive'); //ovo


    if (web2) navigate('/login/tickets');
    else navigate('/main/tickets');
  }

  function myTicketsChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn3"); //ovo


    btn1.classList.add('btnActive');
    btn2.classList.remove('btnActive');
    btn3.classList.add('btnActive');
    btn4.classList.add('btnActive'); //ovo

    btn2.classList.add('inactive');
    btn1.classList.remove('inactive');
    btn3.classList.remove('inactive');
    btn4.classList.remove('inactive'); //ovo
    document.getElementById("img1").src = ticket;
    document.getElementById("img2").src = notificationGreen;
    document.getElementById("img3").src = wallet;

    var btnContainer1 = document.getElementById("btn1Container");
    btnContainer1.classList.add('btnContainerActive');
    var btnContainer2 = document.getElementById("btn2Container");
    btnContainer2.classList.remove('btnContainerActive');
    var btnContainer3 = document.getElementById("btn3Container");
    btnContainer3.classList.add('btnContainerActive');

    var btnContainer4 = document.getElementById("btn4Container"); //ovo
    btnContainer4.classList.add('btnContainerActive'); //ovo

    if (web2) navigate('/login/notifications');
    else navigate('/main/notifications');
  }

  function walletChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn3"); //ovo

    btn1.classList.add('btnActive');
    btn2.classList.add('btnActive');
    btn3.classList.remove('btnActive');
    btn4.classList.add('btnActive'); //ovo

    btn3.classList.add('inactive');
    btn2.classList.remove('inactive');
    btn1.classList.remove('inactive');
    btn4.classList.remove('inactive'); //ovo

    document.getElementById("img1").src = ticket;
    document.getElementById("img2").src = notification;
    document.getElementById("img3").src = walletGreen;

    var btnContainer1 = document.getElementById("btn1Container");
    btnContainer1.classList.add('btnContainerActive');
    var btnContainer2 = document.getElementById("btn2Container");
    btnContainer2.classList.add('btnContainerActive');
    var btnContainer3 = document.getElementById("btn3Container");
    btnContainer3.classList.remove('btnContainerActive');

    var btnContainer4 = document.getElementById("btn4Container"); //ovo
    btnContainer4.classList.add('btnContainerActive'); //ovo

    if (web2) navigate('/login/wallet');
    else navigate('/main/wallet');
  }

  function myDesksChange() {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn3"); //ovo

    btn1.classList.add('btnActive');
    btn2.classList.add('btnActive');
    btn3.classList.add('btnActive');
    btn4.classList.remove('btnActive'); //ovo

    btn4.classList.add('inactive'); //ovo
    btn2.classList.remove('inactive');
    btn1.classList.remove('inactive');
    btn3.classList.remove('inactive');

    document.getElementById("img1").src = ticket;
    document.getElementById("img2").src = notification;
    document.getElementById("img3").src = walletGreen;

    var btnContainer1 = document.getElementById("btn1Container");
    btnContainer1.classList.add('btnContainerActive');
    var btnContainer2 = document.getElementById("btn2Container");
    btnContainer2.classList.add('btnContainerActive');
    var btnContainer3 = document.getElementById("btn3Container");
    btnContainer3.classList.add('btnContainerActive');

    var btnContainer4 = document.getElementById("btn4Container"); //ovo
    btnContainer4.classList.remove('btnContainerActive'); //ovo

    if (web2) navigate('/login/myDesks');
    else navigate('/main/myDesks');
  }

  return (
    <div className="container">
      <div className='buttonContainer' id="btn1Container"><button id='btn1' onClick={seatRentalsChange}><img id="img1" src={ticket} alt='?' />My tickets</button></div>

      <div className='buttonContainer' id="btn2Container">
        <button id='btn2' onClick={myTicketsChange}><img id="img2" src={notification} alt='?' />Notifications {unreadNotifications > 0 ? <div className='notification'>{unreadNotifications}</div> : <></>}</button>
      </div>

      <div className='buttonContainer' id="btn3Container"><button id='btn3' onClick={walletChange}><img id="img3" src={wallet} />Wallet</button></div>

      <div className='buttonContainer' id="btn4Container"><button id='btn4' onClick={myDesksChange}><img id="img3" src={wallet} />Wallet</button></div>

      <div className="bottomDiv">
        <p id="coworkingSpace">Co-working space</p>
        <p id="dashboardPar">dashboard</p>
      </div>
    </div>
  )
}
export default Dashboard