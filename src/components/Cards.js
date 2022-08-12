import React from 'react'
import Card from './Card'


const Cards = ({cards, onDelete}) => {
  return (
    <>
      {
        cards.map((card) => (
          <Card key={card.adresa} card = {card} onDelete={onDelete}/>
        ))
      }
    </>
  )
}

export default Cards