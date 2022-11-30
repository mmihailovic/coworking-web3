import React from 'react'
import '../style/MyDesksStyle.css';
import alert_icon from "../assets/alert-octagon.svg"
import tickets_icon from "../assets/MoreticketsIcon.svg";
import share_icon from "../assets/shareIcon.svg"
import { Button } from 'react-bootstrap';


const MyDesks = () => {
    return (
        <div id='myDesksDiv'>

            <div id='titleDiv'> <p>My Desks</p></div>

            <div id='infoCardsHolderDiv'>

                <div className='infoDivs'>
                    <div className='infoDivsLeftDiv'>
                        <div className='infoDivsLeftDivPart'></div>
                        <div className='infoDivsLeftDivPart UpDiv'><p>5 Desks</p></div>
                        <div className='infoDivsLeftDivPart DownDiv'><p id='p_alert'>expires in a month</p></div>
                        <div className='infoDivsLeftDivPart'></div>
                    </div>
                    <div className='infoDivsRightDiv'>
                        <img className='Icon' src={alert_icon}></img>
                    </div>
                </div>

                <div className='emptyDiv'></div>

                <div className='infoDivs'>
                    <div className='infoDivsLeftDiv'>
                        <div className='infoDivsLeftDivPart'></div>
                        <div className='infoDivsLeftDivPart UpDiv'><p>2 Tickets</p></div>
                        <div className='infoDivsLeftDivPart DownDiv'><p id='p_ticket'>available</p></div>
                        <div className='infoDivsLeftDivPart'></div>
                    </div>
                    <div className='infoDivsRightDiv'>
                        <img className='Icon' src={tickets_icon}></img>
                    </div>
                </div>

                <div className='emptyDiv'></div>

                <div className='infoDivs'>
                    <div className='infoDivsLeftDiv'>
                        <div className='infoDivsLeftDivPart'></div>
                        <div className='infoDivsLeftDivPart UpDiv'><p>15 Tickets</p></div>
                        <div className='infoDivsLeftDivPart DownDiv'><p id='p_shared'>all-time shared</p></div>
                        <div className='infoDivsLeftDivPart'></div>
                    </div>
                    <div className='infoDivsRightDiv'>
                        <img className='Icon' src={share_icon}></img>
                    </div>
                </div>
            </div>

            <div id='rentDeskDiv'>
                <div id='rentDeskTitleDiv'>
                    <div id='leftRent'><p>Rent Desks</p></div>
                    <div id='rightRent'><p>rental credit</p></div>
                </div>

                <div id='textDiv'>
                    <p>Exchange credits in your wallet for office scpace. You can select number of desks and rental<br></br>
                        perion, and we will calculate the price for you.
                    </p>
                </div>

                <div id='inputDiv'>
                    <div className='titleAndInputDiv'>
                        <p>DESK TO RENT</p>
                        <input type="text" placeholder='Number of desks'></input>
                    </div>
                    <div className='emptyInputDiv'></div>
                    <div className='titleAndInputDiv'>
                        <p>RENTAL PERIOD</p>
                        <input type="text" placeholder='Rnetal period in days'></input>
                    </div>
                    <div className='emptyInputDiv'></div>
                    <div id='buttonDiv'>
                        <div id='emptyBtnDiv1'></div>
                        <Button id='btn'>Rent desks</Button>
                        <div id='emptyBtnDiv2'></div>
                    </div>
                    <div id='emptyInputDiv3'></div>
                </div>

                <div id='priceDiv'>
                    <div id='leftPrice'>
                        <div id='leftPriceDiv1'><p>Price:</p></div>
                        <div id='leftPriceDiv2'><p>2.15 Beo</p></div>
                    </div>
                    <div id='rightPrice'><img id='priceDivIcon' src={tickets_icon}></img></div>
                </div>
            </div>

        </div>
    )
}

export default MyDesks
