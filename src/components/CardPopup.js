import "../style/CardPopup.css";
import Card from "./Card";

const CardPopup = ({showPopup, connectFunc, skipFunc}) => {
    return (showPopup)?(
      <div>
          <div className="modalDialog">
              <div className="modalDialog-content" id="modelDialog-contentCardPopup">
                  <div className="modalDialog-body">
                      <div className='titleDiv' id="cardPopupTitleDiv"><p className="confirmpopupTitle">Your ticket B6411264 is expiring in 2 days!</p></div>
                      <div className='contentDiv'>
                          <p className='popupContent'>To continue using BeoSpace, please buy a new one, or request if from your manager.</p>
                      </div>
                      <div className="popupCardDiv">
                      <Card></Card>
                      </div>
                      <button onClick={connectFunc} className='confirmButton' id="cardPopupClose">Close</button>
                      {/* <button onClick={()=>skipFunc(false)} className='skipButton' id='skipWallet'>Skip for now</button> */}
                  </div>
              </div>
          </div>
      </div>
    ):null;
  }

export default CardPopup