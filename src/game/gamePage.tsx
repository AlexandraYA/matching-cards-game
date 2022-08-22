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
  const  [ started, setStarted ] = useState<boolean>(false)
  const  [ step, setStep ] = useState<number>(0)
  const  [ choosedCards, setChoosedCards ] = useState<number[]>([])
  const  [ field, setField ] = useState<TField[]>([])

  useEffect(() => {
    if (level === 1 && !field.length) {
      fillField(LEVEL_1)
    }
  }, [])

  const fillField = (cardsAmount: number) => {
    let i = 0
    let _field: TField[] = []
    let allCards = cards.length

    while (i < cardsAmount) {
      let rnd = Math.floor(Math.random() * allCards)
      
      if (!_field.find(f => f.id === cards[rnd].id)) {
        _field.push.apply(_field, [{
          ...cards[rnd], show: false},
          {...cards[rnd], show: false}
        ])
  
        i++
      }
    }

    setField(_field.sort(() => Math.random() - 0.5))
  }

  const startGame = () => {
    if (!field.length) {
      fillField(LEVEL_1)
    }
    if (level !== 1) {
      setLevel(1)
    }
    setStarted(true)
  }

  const openCard = (cardInd: number) => {
    let _choosed: number[] = []

    if (choosedCards.length < 2) {
      _choosed = [...choosedCards, cardInd]
    } else {
      _choosed = [cardInd]
    }
    
    setChoosedCards(_choosed)
    setStep(step + 1)

    setField(field.map((f, ind) => _choosed.includes(ind) ? {...f, show: true} : {...f, show: false}))
  }

  return ( 
    <div className='container'>
      <header className='header'>
        <h1 className='main-title'>Найди все совпадения</h1>
        <h3>Уровень {level}</h3>
      </header>
      <div className='playground'>
        {!started &&
          <div className='coverage'>
            <button className='button' onClick={startGame}>Играть</button>
          </div>
        }
        <div className='field'>
          {field.map((card: TField, ind: number) => (
            <div
              key={ind}
              className={card.show ? "open" : ""}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => openCard(ind)}
            >
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
