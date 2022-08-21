import React, { useState, useContext, useEffect } from 'react'
import { CardsBase } from '../store/context'
import CardBack from '../assets/images/card-back-black.png'

type TField = {
  id: number;
  src: string;
  show?: boolean;
}

const LEVEL_1 = 6
const LEVEL_2 = 12
const LEVEL_3 = 24


const GamePage: React.FC = () => {
  const cards = useContext(CardsBase);

  const  [ level, setLevel ] = useState<number>(1)
  const  [ step, setStep ] = useState<number>(0)
  const  [ choosedCards, setChoosedCards ] = useState<number[]>([])
  const  [ field, setField ] = useState<TField[]>([])

  useEffect(() => {
    if (level === 1 && !field.length) {
      let i = 0
      let _field: TField[] = [];

      while (i < LEVEL_1) {
        let rnd = Math.floor(Math.random() * 24)
        _field.push.apply(_field, [{
          ...cards[rnd], show: false},
          {...cards[rnd], show: false}
        ])
        i++
      }

      setField(_field.sort(() => Math.random() - 0.5))
    }
  }, [])


  return ( 
    <div className='container'>
      <header className='header'>
        <h1 className='main-title'>Найди все совпадения</h1>
        <h3>Уровень {level}</h3>
      </header>
      <div className='playground'>
        <button className='button'>Играть</button>
        <div className='field'>
          {field.map((card: TField, ind: number) => (
            <div key={ind} data-id={card.id}>
              <img className='image-face' src={card.src} alt={`card face ${card.id}`} />
              <img className='image-back' src={CardBack} alt="card back" />
            </div>
          ))}
        </div>
      </div>
      <footer className='footer'>
        <a href="https://www.flaticon.com/ru/free-stickers/" rel='noreferrer' title="свинья стикеры" target="_blank">
          Стикеры от Stickers - Flaticon
        </a>
      </footer>
    </div>
  )
}

export default GamePage
