import React from 'react'
import CardBack from '../../assets/images/card-back-black.png'
import { TField } from '../../store/types'


interface ICard {
  card: TField;
  openCard: () => void;
}

const Card: React.FC<ICard> = ({ card, openCard }) => (
    <div
      className={card.found ? "found" : card.show ? "open" : ""}
      onClick={openCard}
      data-testid={card.show ? "card-open" : "card-closed"}
    >
      <div className='image-face' ><img src={card.src} alt={`card face ${card.id}`} /></div>
      <img className='image-back' src={CardBack} alt="card back" />

      {card.found && <div className="card-cover"></div>}
    </div>
)

export { Card }