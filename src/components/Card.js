import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Card = ({card, onDelete}) => {
  return (
    <div style={{border: '2px dotted'}}>
      <FaTimes style={{float: 'right', cursor: 'pointer'}} onClick={() => onDelete(card.adresa)}/>
      <p>{card.cardId}</p>
      <p>{card.accountAddress}</p>
      <p>{card.amount}</p>
    </div>
  )
}

export default Card
