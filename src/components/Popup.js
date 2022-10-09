import "../style/Popup.css";
import close from '../assets/Close.svg';

function Popup({trigger, emailToShow, func}) {
  return (trigger)?(
    <div>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-body">
                  <button onClick={()=>func(false)}><img src={close}id="closeBtn"></img></button>
                  <p className="popupTitle">Check your email</p>
                  <ul className="popupText">
                    <li>We emailed a magic link to</li>
                    <li id="emailText">{emailToShow}</li>
                    <li>Click the link to log in or sign up.</li>
                  </ul>
                </div>
              </div>
          </div>
      </div>
  ):null;
}

export default Popup