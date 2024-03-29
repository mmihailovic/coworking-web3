export async function insertTicketsWeb2(hash, date) {
  const dateParts = (date).split("/");
  const endDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0] + 1);
  fetch(process.env.REACT_APP_insertTicket, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hash, endDate }),
  })
}


export async function selectEmailWeb2(hash) {

  return fetch(process.env.REACT_APP_selectEmail, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hash }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => {
          const ret = json[0].result;
          return ret;
        });
      }
    });
}


export async function selectUser(email) {
  return fetch(process.env.REACT_APP_selectUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => {
          const ret = json[0].result;
          return ret;
        });
      }
    });
}

export async function checkUser(email) {
  return fetch("https://coworking-khuti.ondigitalocean.app/api/checkUser", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(response => {
      if (response.status == 200) {
        return true;
      }
      return false;
    });
}


export async function insertUser(email, avatar) {

  fetch(process.env.REACT_APP_insertUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, avatar }),
  })
}


export async function shareTicketWeb2(hash, email) {
  return fetch("https://coworking-khuti.ondigitalocean.app/api/shareTicket", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hash, email }),
  })
    .then(response => {
      console.log(response.text());
      return response.status;
    });
}


export async function numberOfUnreadNotificationWeb2(email, isReceived) {
  return fetch("https://coworking-khuti.ondigitalocean.app/api/numberOfUnreadNotification", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, isReceived }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => {
          const ret = json[0].result;
          return ret;
        });
      }
    });
}


export async function viewTicketWeb2(notification_id) {
  return fetch("https://coworking-khuti.ondigitalocean.app/api/updateNotification", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ notification_id }),
  })
}


//"https://coworking-khuti.ondigitalocean.app/api/selectAllNotifacations"
//"http://localhost:3002/selectAllNotifacations"
export async function selectNotificationsWeb2(email) {
  return fetch("https://coworking-khuti.ondigitalocean.app/api/selectAllNotifacations", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => {
          const ret = json;
          return ret;
        });
      }
    });
}


export async function selectTickets(email) {

  return fetch(process.env.REACT_APP_selectTickets, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => {
          const ret = json;
          return ret;
        });
      }
    });
}


//"https://coworking-khuti.ondigitalocean.app/api/selectSingleTicket"
//"http://localhost:3002/selectSingleTicket"
export async function selectSingleTicketWeb2(ticket_id) {

  return fetch("https://coworking-khuti.ondigitalocean.app/api/selectSingleTicket", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticket_id }),
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(json => {
          const ret = json;
          console.log(ret);
          return ret;
        });
      }
    });
}