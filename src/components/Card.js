import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Card = ({card, onDelete}) => {
  return (
    <div style={{border: '2px dotted'}}>
      <FaTimes style={{float: 'right', cursor: 'pointer'}} onClick={() => onDelete(card.adresa)}/>
      <p>{card.adresa}</p>
      <p>{card.ime}</p>
      <p>{card.prezime}</p>
    </div>
  )
}

export default Card
