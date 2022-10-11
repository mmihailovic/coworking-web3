import React from 'react';
import "../style/PopupNotification.css"

const PopupNotification = () => {
    
  return (
    <div className='divMain'>
        <div className='titleDiv'>
            <div>
                <p className='title'>Ticket is expiriing</p>
            </div>
            <div>
                <p className='time_passed'>5m ago</p>
            </div>
        </div>
        <div style={{width:"270px"}}>
            <p className='notif_message'>Your ticket B6411264 is expiring in 2 days!</p>
        </div>
    </div>
  )
}

export default PopupNotification;