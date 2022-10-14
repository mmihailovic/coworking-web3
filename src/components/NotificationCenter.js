import React, { useEffect, useState } from 'react';
import "../style/NotificationCenter.css";
import Notification from './Notification';
import { selectNotificationsWeb2, viewTicketWeb2 } from '../web2communication';

const NotificationCenter = ({ email, numberOfUnreadNotifications, setNumberOfUnreadNotifications, setShowCardPopup, setNotificationInNotificationPopup, setCardInNotificationPopup }) => {

  const [notifications, setNotifications] = useState([]);
  const [rerender, setRerender] = useState(false);
  //const [curr_notification_date, set_curr_notification_date] = useState(new Date());
  let curr_notification_date = new Date();

  async function getNotifications(email) {
    let notification = await selectNotificationsWeb2(email);

    if (notification != null) {
      setNotifications(notification);
      //curr_notification_date = new Date(notification[0].date);
      //console.log("Notif " + notification[0].date);
    }
  }

  useEffect(() => {
    getNotifications(email);
    //console.log("USAOOOO");
  }, [rerender])


  useEffect(() => {
    getNotifications(email);
  }, [])

  useEffect(() => {
    console.log("USAO READ ALL");
    getNotifications(email);
  }, [numberOfUnreadNotifications])

  async function markAllNotificationsAsRead() {
    for (let i = 0; i < notifications.length; i++) {

      if (notifications[i].received == false) {
        await viewTicketWeb2(notifications[i].id);
      }
    }
    setNumberOfUnreadNotifications(0);
  }

  function areDatesEqual(date1, date2) {
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth()
      && date1.getFullYear() == date2.getFullYear();
  }


  return (
    <div style={{ position: "absolute", width: "90%", top: "2%", left: "25%", width: "65%", height: "100%", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className='notifications'>Notification center</p>
        <p className='markAll' onClick={markAllNotificationsAsRead}>Mark all as read</p>
      </div>
      {/* <Notification></Notification>
        <Notification></Notification> */}
      {
        notifications.map((item) => {

          let tmp_notification_date = new Date(item.date);
          let shouldAddDateParagraph = !areDatesEqual(tmp_notification_date, curr_notification_date);
          if (shouldAddDateParagraph) curr_notification_date = tmp_notification_date;

          return (

            <>
              {shouldAddDateParagraph ? <p>{item.date}</p> : <></>}
              <Notification setCardInNotificationPopup={setCardInNotificationPopup} setNotificationInNotificationPopup={setNotificationInNotificationPopup}
                setShowCardPopup={setShowCardPopup} key={item.id} notification={item} numberOfUnreadNotifications={numberOfUnreadNotifications}
                setNumberOfUnreadNotifications={setNumberOfUnreadNotifications}>
              </Notification>
            </>
          );
        })}
    </div>
  )
}

export default NotificationCenter;