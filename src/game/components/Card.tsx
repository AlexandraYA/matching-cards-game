import React from 'react'
import CardBack from '../assets/images/card-back-black.png'
import { TField } from '../../store/types'


interface ICard {
  ind: number;
  card: TField;
  openCard: Function;
}

const Card: React.FC<ICard> = ({ ind, card, openCard }) => (
    <div
      key={ind}
      className={card.show ? "open" : ""}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => openCard(ind)}
    >
      <img className='image-face' src={card.src} alt={`card face ${card.id}`} />
      <img className='image-back' src={CardBack} alt="card back" />
    </div>
)

export { Card }