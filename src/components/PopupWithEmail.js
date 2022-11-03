import "../style/CardPopup.css";
import "../style/PopupWithEmail.css";
import close from '../assets/Close.svg';
import tick from '../assets/tick.svg';

const PopupWithEmail = ({ showPopup, func, skipFunc, email, shareTicket}) => {

  return (showPopup) ? (
    <div>
      <div className="popupmodal">
        <div className={`${shareTicket ? 'popupmodal-content' : 'popupmodal-content'}`} id="sharingTicketPopup">
          <div className="cardPopupmodalDialog-body">
            {!shareTicket?<img id="tick" src={tick}></img>:null}
            <button onClick={() => skipFunc(false)}><img src={close} id="closeButton"></img></button>
            <div><p id={`${shareTicket ? "shareTitle" : "sharingTitle"}`} className="cardPopupTitle">{shareTicket ? "Are you sure you want to share the ticket?"  : "Sharing successful"}</p></div>
            {/* <div className='cardPopupcontentDiv'> */}
            <div id={`${shareTicket ? "shareContent" : "sharingContent"}`}>
              <p className='cardPopupContent'>{shareTicket ? 'Your ticket B123459 will be sent to' : 'Your ticket was successfuly shared with'}</p>
              <p className="cardPopupContent" id="email">{email}</p>
              <p className="cardPopupContent">{shareTicket?"You won't be able to use it for yourself.":"You will still be able to see it in the 'My tickets' section."}</p>
            </div>
            <button onClick={() => shareTicket ? skipFunc(false) : func()} className='cardPopupconfirmButton' id={`${shareTicket ? "confirmSharingButton" : "closeSharingButton"}`}>{shareTicket ? 'YES, I WANT TO SHARE THE TICKET':'Close'}</button>
            {shareTicket ? <button className="skipButton" id="backToDashboard" onClick={() => skipFunc(false)}>Back to dashboard</button> : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default PopupWithEmail