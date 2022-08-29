import React from 'react'
import CardBack from '../../assets/images/card-back-black.png'
import { TField } from '../../store/types'


interface ICard {
  card: TField;
  openCard: () => void;
}

const Card: React.FC<ICard> = ({ card, openCard }) => (
    <div
      className={card.show ? "open" : ""}
      onClick={openCard}
      data-testid={card.show ? "card-open" : "card-closed"}
    >
      <img className='image-face' src={card.src} alt={`card face ${card.id}`} />
      <img className='image-back' src={CardBack} alt="card back" />
    </div>
)

export { Card }