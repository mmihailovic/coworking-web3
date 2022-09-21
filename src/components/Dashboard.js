import React, { useState, useEffect } from 'react';
import "../style/Dashboard.css";
import ticket from '../assets/ticket-2.svg'
import monitorDesktop from '../assets/monitor-desktop.svg'
import monitorDesktopGreen from '../assets/monitor-desktopGreen.svg'
import ticketGreen from '../assets/ticket-2Green.svg'

function Dashboard({myBool,setmyBool}) {

useEffect(() => {
    var btn2 = document.getElementById("btn2");
    document.getElementById("img2").src=ticketGreen;
    btn2.classList.add('inactive');
    
  }, []);

function seatRentalsChange() {
    setmyBool(true);
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    
    btn1.classList.add('inactive');
    btn2.classList.remove('inactive');
    document.getElementById("img1").src=monitorDesktopGreen;
    document.getElementById("img2").src=ticket;
}

function myTicketsChange() {
    setmyBool(false);
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");

    btn2.classList.add('inactive');
    btn1.classList.remove('inactive');
    document.getElementById("img1").src=monitorDesktop;
    document.getElementById("img2").src=ticketGreen;
    
 } 

  return (
    <div className="container">
        <div  className='buttonContainer'><button id='btn1' onClick={seatRentalsChange}><img id="img1" src={monitorDesktop} alt='?'/>Seat rentals</button></div>
        <div  className='buttonContainer'><button id='btn2' onClick={myTicketsChange}><img id="img2" src={ticket} alt='?'/>My tickets</button></div>
        <div className="bottomDiv">
            <p id="coworkingSpace">Co-working space</p>
            <p id="dashboardPar">dashboard</p>
        </div>
    </div>
  ) 
}
export default Dashboard