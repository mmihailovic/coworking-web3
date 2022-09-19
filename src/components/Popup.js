import "../style/Popup.css"

function Popup({trigger, func, content, title}) {
  return (trigger)?(
    <div>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <p>{title}</p>
                </div>
                <div className="modal-body">
                <p>{content}</p>
                </div>
                <div className="modal-footer">
                <button onClick={() => func(false)}>Close</button>
                </div>

            </div>    
        </div>
    </div>
  ):null;
}

export default Popup