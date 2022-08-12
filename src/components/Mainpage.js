import React from 'react';
import Cards from './Cards';
import { useState } from 'react';
import "../style/mainpageStyle.css"

const Mainpage = ({accountAddress}) => {

  const [cards, setCards] = useState([
    {
      adresa: 1,
      ime: 'Aleksa',
      prezime: 'Prokic'
    },
    {
      adresa: 2,
      ime: 'Mihail',
      prezime: 'Jovanoski'
    },
    {
      adresa: 3,
      ime: 'Zarko',
      prezime: 'Radenkovi'
    },
    {
      adresa: 4,
      ime: 'Marko',
      prezime: 'Mihailovic'
    },
    {
      adresa: 5,
      ime: 'Vvk',
      prezime: 'Kvv'
    },
    {
      adresa: 6,
      ime: 'Zarko',
      prezime: 'Radenkovi'
    },
    {
      adresa: 7,
      ime: 'Marko',
      prezime: 'Mihailovic'
    },
    {
      adresa: 8,
      ime: 'Vvk',
      prezime: 'Kvv'
    },
    {
      adresa: 9,
      ime: 'Zarko',
      prezime: 'Radenkovi'
    },
    {
      adresa: 10,
      ime: 'Marko',
      prezime: 'Mihailovic'
    },
    {
      adresa: 11,
      ime: 'Vvk',
      prezime: 'Kvv'
    },
    {
      adresa: 12,
      ime: 'Marko',
      prezime: 'Mihailovic'
    },
    {
      adresa: 13,
      ime: 'Vvk',
      prezime: 'Kvv'
    },
    {
      adresa: 14,
      ime: 'Zarko',
      prezime: 'Radenkovi'
    },
    {
      adresa: 15,
      ime: 'Marko',
      prezime: 'Mihailovic'
    },
    {
      adresa: 16,
      ime: 'Vvk',
      prezime: 'Kvv'
    }
  ])
  
  return (
    <div>
      <div className='leftDiv'>
        <p>{accountAddress}</p>
        {console.log('Account address: ' + accountAddress)}
      </div>
      <div className='rightDiv'>
        <p>Mainpage</p>
        <Cards cards = {cards}/>
      </div>
    </div>
  )
}

export default Mainpage;