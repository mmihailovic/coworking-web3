import React from 'react'
import PopupNotification from './PopupNotification';

const PopupNotifications = ({notifications}) => {
  return (
    <>
    {
        notifications.map((item) => {
            return (
                <PopupNotification key={item.id} notification={item}></PopupNotification>
            );
    })}
    </>
  )
}

export default PopupNotifications