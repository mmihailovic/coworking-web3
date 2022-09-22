import "../style/Tickets.css";
import React,{useEffect, useState} from "react";
import Cards from "./Cards";

const Tickets = ({cards,setAvailableCards,setRedeemedCards,setExpiredCards,first,setFirst}) => {
  useEffect(() => {
    document.getElementById("available").classList.add("active");
    setFirst(false);
  }, [first]);
    const availableClick = () => {
      let available = document.getElementById("available");
      let redeemed = document.getElementById("redeemed");
      let expired = document.getElementById("expiredButton");
        available.style.color = "#000000";
        redeemed.style.color = "#93A4B7";
        expired.style.color = "#93A4B7";
        setAvailableCards(true);
        setRedeemedCards(false);
        setExpiredCards(false);
    }
    const redeemedClick = () => {
      let available = document.getElementById("available");
      let redeemed = document.getElementById("redeemed");
      let expired = document.getElementById("expiredButton");
      redeemed.style.color = "#000000";
      available.style.color = "#93A4B7";
      expired.style.color = "#93A4B7";
      setAvailableCards(false);
      setRedeemedCards(true);
      setExpiredCards(false);
    }
    const expiredClick = () => {
      let available = document.getElementById("available");
      let redeemed = document.getElementById("redeemed");
      let expired = document.getElementById("expiredButton");
        expired.style.color = "#000000";
        available.style.color = "#93A4B7";
        redeemed.style.color = "#93A4B7";
        setAvailableCards(false);
        setRedeemedCards(false);
        setExpiredCards(true);
    }
    const items = document.querySelectorAll("ul li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelector("li.active").classList.remove("active");
        item.classList.add("active");
      });
    });
  return (
    <div style={{position:"absolute", width:"90%", top:"2%", left:"25%", width:"65%", height:"100%"}}>
          <div style={{position:"relative", height:"70%", top:"2%", height:"10%"}}>

          <p id="tickets">My tickets</p>
          <ul>
              <li style={{width:"5.5vw"}} id="available" onClick={availableClick} className="active">Available</li>
              <li style={{width:"5vw"}}id="redeemed"onClick={redeemedClick}>Redeemed</li>
              <li style={{width:"4.3vw"}}id="expiredButton"onClick={expiredClick}>Expired</li>
          </ul>
          </div>
        <div style={{height:"60%", width:"100%"}}>
        <Cards id="karte" cards={cards}></Cards>
        </div>
    </div>
  )
}

export default Tickets