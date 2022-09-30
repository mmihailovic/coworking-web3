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

export async function selectUser(wallet_address) {
  return fetch("https://coworking-khuti.ondigitalocean.app/api/selectUser", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wallet_address }),
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

export async function insertUser(wallet_address, avatar) {
  
  fetch(process.env.REACT_APP_insertUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wallet_address, avatar }),
  })
}