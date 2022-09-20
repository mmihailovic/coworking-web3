import "../style/Tickets.css";
import React from "react";
import Cards from "./Cards";

const Tickets = ({cards,setAvailableCards,setRedeemedCards,setExpiredCards}) => {
    const available = document.getElementById("available");
    const redeemed = document.getElementById("redeemed");
    const expired = document.getElementById("expired");
    const availableClick = () => {
        available.style.color = "#000000";
        redeemed.style.color = "#93A4B7";
        expired.style.color = "#93A4B7";
        setAvailableCards(true);
        setRedeemedCards(false);
        setExpiredCards(false);
    }
    const redeemedClick = () => {
        redeemed.style.color = "#000000";
        available.style.color = "#93A4B7";
        expired.style.color = "#93A4B7";
        setAvailableCards(false);
        setRedeemedCards(true);
        setExpiredCards(false);
    }
    const expiredClick = () => {
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
    <div>
        <p id="tickets">My tickets</p>
        <ul>
            <li id="available" onClick={availableClick} className="active">Available</li>
            <li id="redeemed"onClick={redeemedClick}>Redeemed</li>
            <li id="expired"onClick={expiredClick}>Expired</li>
        </ul>
        <Cards id="karte" cards={cards}></Cards>
    </div>
  )
}

export default Tickets