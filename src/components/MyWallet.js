import React, { useState } from 'react';
import '../style/MyWalletStyle.css';
import icon from "../assets/MoreticketsIcon.svg";
import { Button } from 'react-bootstrap';

const MyWallet = ({walletAddress, beoTokenBalance, stakedTokes, stakeTokens}) => {

    function stake() {
        let stakingAmount = document.getElementById("inputAmount").value;
        let isnum = /^\d+$/.test(stakingAmount);
        if(isnum){
            console.log(stakingAmount);
            stakeTokens(stakingAmount);
        }
        else{
            console.log("NOT A NUMBER")
        }
    }


  return (
    <div className='myWalletDiv' style={{position:"absolute", top:"2%", left:"27.5%", width:"65%", height:"100%", overflowY:"auto"}}>
        <div>
            <p className="myWallet">Wallet</p>
            
            <div className='walletAddressDiv'>
                <p className='walletAddress'>{walletAddress} </p>
                <p id='connectedText'>connected</p>
            </div>

            <div className='balanceDiv'>
                <div className='balanceDivInner'>
                    <p className='balanceText'>{beoTokenBalance} BeoTokens</p>
                    <p id='inWalletText'>in wallet</p>
                </div>
                <div className='testDiv'>

                </div>
                <img className='iconBalance' src={icon} alt='icon' height={80} width={80}></img>
            </div>
        </div>

        <div>
            <p className='credits'>Credits</p>

            <div className='stakingDiv'>
                <div style={{display:"flex", justifyContent:"space-between", marginTop:"30px"}}>
                    <p className='balanceText' style={{marginLeft:"30px"}}>{stakedTokes} BeoTokens</p>
                    <p id='rentalCreditText'>rental credit</p>
                </div>

                <p id='stakeInfo'>BeoDesks uses BeoTokens for desk rentals. To use BeoDesks, you need to have BeoTokens in your wallet
                , which you can exchange for credits before renting office space.</p>

                <p style={{marginLeft:"30px", marginTop:"30px", fontFamily:"Space Mono", fontWeight:"700", fontSize:"14px"}}>GET CREDITS</p>

                <div style={{marginLeft:"30px", marginTop:"20px"}}>
                    <input id='inputAmount' placeholder='Number of credits, e.g. 4'></input>
                    <Button id='buyCreditsBtn' onClick={stake}>BUY CREDITS</Button>
                </div>

                <div style={{marginLeft:"30px", marginTop:"40px"}}>
                    <p style={{display:"inline",fontFamily:"Roboto Mono", fontWeight:"700", fontSize:"14px"}}>Don't need credits anymore?</p>
                    <p style={{display:"inline", marginLeft:"15px", fontFamily:"Space Mono", fontWeight:"700", fontSize:"14px", color:"#DA918F", cursor:"pointer"}}>Sell credits</p>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default MyWallet