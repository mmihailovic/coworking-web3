import React from 'react'
import '../style/ConfirmPopup.css';
import close from '../assets/Close.svg';

const ConfirmPopup = ({showPopup, connectFunc, skipFunc}) => {
  return (showPopup)?(
    <div>
        <div className="modalDialog">
            <div className="modalDialog-content">
                <div className="modalDialog-body">
                    <button onClick={()=>skipFunc(false)}><img src={close}id="closeButton"></img></button>
                    <div className='titleDiv'><p className="confirmpopupTitle" id="p0">Connect a wallet to rent desks</p></div>
                    <div className='contentDiv'>
                        <p className='popupContent'>You need to connect a wallet to use rent desks and buy tickets for BeoSpace.</p>
                    </div>
                    <div id="div1">
                        <p className='boldedContent'>Don't have a crypto wallet?</p>
                        <p className='popupContent' id="p1">No worries, you</p>
                    </div>
                    <div id="div2">
                        <p className='popupContent' id="p2">    can still recieve and use tickets in the app.</p>
                    </div>
                    <button onClick={connectFunc} className='confirmButton' id='connectWallet'>CONNECT WALLET</button>
                    <button onClick={()=>skipFunc(false)} className='skipButton' id='skipWallet'>Skip for now</button>
                </div>
            </div>
        </div>
    </div>
  ):null;
}

export default ConfirmPopup