import React, { useEffect } from 'react'
import '../style/ConfirmPopup.css';
import close from '../assets/Close.svg';
import { useState } from 'react';
 
const ConfirmPopup = ({showPopup, connectFunc, skipFunc, title, content, buttonText, inputTitle, sell, buttonColor, unstakeFunc}) => {
    const [buttonEnabled,setButtonEnabled] = useState(false);
    const [unstakeAmount,setUnstakeAmount] = useState(0);

    const handleUnstake = () => {
        let amount = document.getElementById("numberPopup").value;
        let isnum = /^\d+$/.test(amount);
        if(isnum) {
            setButtonEnabled(true);
            setUnstakeAmount(amount);
        }
        else setButtonEnabled(false);
    }
  return (showPopup)?(
    <div>
        <div className="modalDialog">
            <div className="modalDialog-content">
                <div className="modalDialog-body">
                    <button onClick={()=>skipFunc(false)}><img src={close}id="closeButton"></img></button>
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
                    {sell == true?<input onChange={handleUnstake} type="number" id="numberPopup" className='inputInPopup' placeholder='Number of credits, e.g. 4'></input>:sell==false?<input onChange={handleUnstake} id="numberPopup" type="email"className='inputInPopup'placeholder='Email address (username)'></input>:null}</>
                    }
                    <button onClick={()=>{if(sell){unstakeFunc(unstakeAmount); skipFunc(false);} else connectFunc()}} id='connectWallet' className="confirmButton" style={{background:buttonEnabled?buttonColor:"#CBD5E1"}} disabled={buttonEnabled?false:true}>{buttonText}</button>
                    {sell==true?<button onClick={()=>skipFunc(false)} className='skipButton' id='skipWallet'>Cancel</button>:<button onClick={()=>skipFunc(false)} className='skipButton' id='skipWallet'>Skip for now</button>}
                </div>
            </div>
        </div>
    </div>
  ):null;
}

export default ConfirmPopup