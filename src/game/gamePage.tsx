import React, { useState, useContext} from 'react'
import { CardsBase } from '../store/context'
import CardBack from '../assets/images/card-back-black.png'

type TField = {
  id: number;
  src: string;
  show: boolean;
}

const GamePage = () => {
  const cards = useContext(CardsBase);

  const  [ level, setLevel ] = useState<number>(1);
  const  [ step, setStep ] = useState<number>(0);
  const  [ choosedCards, setChoosedCards ] = useState<number[]>([]);
  const  [ field, setField ] = useState<TField[]>([]);


  return ( 
    <div className='container'>
      <header>
        <h1>Игра "Найди все пары"</h1>
        <h2>Уровень {level}</h2>
      </header>
      <div className='playground'>
        <button>Играть</button>
        <div className='field'>
          {field.map((card: TField) => (
            <div data-id={card.id}>
              <img src={card.src} alt={`card face ${card.id}`} />
              <img src={CardBack} alt="card back" />
            </div>
          ))}
        </div>
      </div>
      <footer>
        <a href="https://www.flaticon.com/ru/free-stickers/" rel='noreferrer' title="свинья стикеры" target="_blank">
          Стикеры от Stickers - Flaticon
        </a>
      </footer>
    </div>
  )
}

export default GamePage
