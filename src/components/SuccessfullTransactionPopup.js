import "../style/Popup.css";
import "../style/SuccessfullTransactionPopup.css";
import close from '../assets/Close.svg';
import tick from '../assets/tick.svg';

function SuccessfullTransactionPopup({trigger, title, skipFunc, viewTickets, numberOfDesks, period}) {
  return (trigger)?(
    <div>
        <div className="popupmodal">
            <div className="popupmodal-content" id="successfulTransaction">
                <div className="modalpopup-body">
                <button onClick={()=>skipFunc(false)}><img src={close}id="closeBtn"></img></button>
                <img id="tick" src={tick}></img>
                  <p className="popupTitle1" id="successfulTitle">{title}</p>
                  <div><p id="successfulContent">{"You successfully rented " + numberOfDesks +" desk for "+period+" month. The tickets are available in your dashboard."}</p></div>
                  <button onClick={viewTickets} className="confirmButton" id="viewTickets">VIEW TICKETS</button>
                  <button onClick={()=>skipFunc(false)} className='skipButton' id="closeSuccessfulPopup">Close</button>   
                </div>
              </div>
          </div>
      </div>
  ):null;
}

export default SuccessfullTransactionPopup