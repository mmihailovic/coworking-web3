import React, { useEffect } from 'react'
import '../style/ConfirmPopup.css';
import close from '../assets/Close.svg';
import { useState } from 'react';
import { checkUser } from '../web2communication';
 
const ConfirmPopup = ({showPopup, connectFunc, skipFunc, title, content, buttonText, inputTitle, sell, buttonColor, unstakeFunc}) => {
    const [buttonEnabled,setButtonEnabled] = useState(false);
    const [unstakeAmount,setUnstakeAmount] = useState(0);
    const [checking,setChecking] = useState(false);
    const [wrong,setWrong] = useState(false);

    const handleUnstake = () => {
        let amount = document.getElementById("numberPopup").value;
        let isnum = /^\d+$/.test(amount);
        if(isnum) {
            setButtonEnabled(true);
            setUnstakeAmount(amount);
        }
        else setButtonEnabled(false);
    }
    const handleEmail = async () => {
        const email = document.getElementById("emailPopupInput").value;
        if(email.includes("@")){
            setChecking(true);
            const res = await checkUser(email);
            if(res == false) {
                setButtonEnabled(false);
                setWrong(true);
            }
            else {
                setButtonEnabled(true);
                setWrong(false);
            }
            setChecking(false);
        }
        else {
            setButtonEnabled(false);
            setWrong(false);
        }
    }
  return (showPopup)?(
    <div>
        <div className="modalDialog">
            <div className="modalDialog-content">
                <div className="modalDialog-body">
                    <button onClick={()=>{skipFunc(false);setButtonEnabled(false);}}><img src={close}id="closeButton"></img></button>
                    <div className='titleDiv'><p className="confirmpopupTitle" id="p0">{title}</p></div>
                    <div className='contentDiv'>
                        <p className='popupContent'>{content}</p>
                    </div>
                    {typeof inputTitle === 'undefined'?<><div id="div1">
                        <p className='boldedContent'>Don't have a crypto wallet?</p>
                        <p className='popupContent' id="p1">No worries, you</p>
                    </div>
                    <div id="div2">
                        <p className='popupContent' id="p2">    can still recieve and use tickets in the app.</p>
                    </div></>:<><p style={{fontFamily:"Space Mono", position:"absolute", top:"54%", left:"20%", fontWeight:"bold", fontSize:"0.9em"}}>{inputTitle}</p>
                    {sell == true?<input onChange={handleUnstake} type="number" id="numberPopup" className='inputInPopup' placeholder='Number of credits, e.g. 4'></input>:sell==false?<><input onChange={handleEmail} id="emailPopupInput" type="email"className={`${wrong?'wrong':checking?'checking':'inputInPopup'}`} placeholder='Email address (username)'></input>{wrong?<p className='wrongText'>No user found with this email address</p>:null}</>:null}</>                    }
                    <button onClick={()=>{if(sell){unstakeFunc(unstakeAmount); skipFunc(false);} else connectFunc()}} id='connectWallet' className="confirmButton" style={{background:buttonEnabled || sell == null?buttonColor:"#CBD5E1"}} disabled={buttonEnabled == true || sell == null?false:true}>{buttonText}</button>
                    <button onClick={()=>{skipFunc(false); setButtonEnabled(false);}} className='skipButton' id='skipWallet'>{typeof inputTitle !== 'undefined'?'Cancel':'Skip for now'}</button>   
                </div>
            </div>
        </div>
    </div>
  ):null;
}

export default ConfirmPopup