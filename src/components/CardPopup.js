import "../style/CardPopup.css";
import Card from "./Card";
import close from '../assets/Close.svg';

const CardPopup = ({showPopup, func, skipFunc, expiring, email, card}) => {
    return (showPopup)?(
      <div>
          <div className="cardPopupDialog">
              <div className={`${expiring ? 'cardPopupmodalDialog-content' : 'cardPopupmodalDialog-contentRedeem'}`}>
                  <div className="cardPopupmodalDialog-body">
                  <button onClick={()=>skipFunc(false)}><img src={close}id="closeButton"></img></button>
                      <div className='cardPopuptitleDiv'><p className="cardPopupTitle">{expiring?'Your ticket B6411264 is expiring in 2 days!':'You received a ticket B6411264!'}</p></div>
                      <div className='cardPopupcontentDiv'>
                          <p className='cardPopupContent'>{expiring?'To continue using BeoSpace, please buy a new one, or request if from your manager.':'You received a new ticket from'}</p>
                          {!expiring?<p className="cardPopupContent" id="email">{email}</p>:null}
                      </div>
                      <div className="cardPopupCardDiv">
                        {/* <Card card={card}></Card> */}
                      </div>
                      <button onClick={()=>expiring?skipFunc(false):func()} className='cardPopupconfirmButton' id={`${expiring?"closeBtnCardPopup":"closeBtnCardPopupRedeem"}`}>{expiring?'Close':'Redeem Ticket'}</button>
                      {!expiring?<button className="skipButton" id="useLater" onClick={()=>skipFunc(false)}>Use it later</button>:null}
                  </div>
              </div>
          </div>
      </div>
    ):null;
  }

export default CardPopup