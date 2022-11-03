import React from 'react'
import '../style/ConfirmPopup.css';
import '../style/TransactionPopup.css';

import close from '../assets/Close.svg';
 
const TransactionPopup = ({showPopup, connectFunc, skipFunc, numberOfDesks,period,price}) => {
  return (showPopup)?(
    <div>
        <div className="modalDialog">
            <div className="modalDialog-content">
                <div className="modalDialog-body">
                    <button onClick={()=>skipFunc(false)}><img src={close}id="closeButton"></img></button>
                    <div className='titleDiv'><p className="confirmpopupTitle" id="transactionTitle">Confirm transaction</p></div>
                        <p className='popupContent' id="transactionContent">You are renting:</p>
                    <div id="transactionData">
                        <ul>
                            <li id="transactionDataTable"className='data'>Number of desks:</li><p className='bluetext' id="numberOfDesksText">{numberOfDesks}</p>
                            <li id="transactionDataTable"className='data'>Period:</li> <p className='bluetext' id="periodText">{period} month</p>
                            <li className='data'>Price:</li><p className='bluetext' id="priceText">{price} Beo</p>
                        </ul>
                    </div>
                    <button onClick={connectFunc} id='rentingProceed' className="confirmButton">PROCEED WITH RENTING</button>
                    <button onClick={()=>skipFunc(false)} className='skipButton' id='rentingSkip'>Back to dashboard</button>   
                </div>
            </div>
        </div>
    </div>
  ):null;
}

export default TransactionPopup