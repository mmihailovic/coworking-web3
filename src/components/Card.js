import React from 'react'

const Card = ({card}) => {
  return (
    <div style={{border: '2px dotted'}}>
      <p>{card.adresa}</p>
      <p>{card.ime}</p>
      <p>{card.prezime}</p>
    </div>
  )
}

export default Card
