import React, { useState, useContext, useEffect } from 'react'
import { CardsBase } from '../store/context'
import CardBack from '../assets/images/card-back-black.png'

type TField = {
  id: number;
  src: string;
  show?: boolean;
  found?: boolean;
}

const LEVEL_1 = 6
const LEVEL_2 = 12
const LEVEL_3 = 24

let timeoutID: any = null


const GamePage: React.FC = () => {
  const cards = useContext(CardsBase);

  const  [ level, setLevel ] = useState<number>(1)
  const  [ mode, setMode ] = useState<'greeting' | 'start' | 'end' | 'loading'>('greeting')
  const  [ step, setStep ] = useState<number>(0)
  const  [ choosedCards, setChoosedCards ] = useState<number[]>([])
  const  [ field, setField ] = useState<TField[]>([])

  useEffect(() => {
    if (level === 1 && !field.length) {
      fillField(LEVEL_1)
    }

    return () => clearTimeout(timeoutID)
  }, [])

  const fillField = (cardsAmount: number) => {
    let i = 0
    let _field: TField[] = []
    let allCards = cards.length

    while (i < cardsAmount) {
      let rnd = Math.floor(Math.random() * allCards)

      if (!_field.find(f => f.id === cards[rnd].id)) {
        _field.push.apply(_field, [{
          ...cards[rnd], show: false, found: false},
          {...cards[rnd], show: false, found: false}
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
    setMode('start')
  }

  const openCard = (cardInd: number) => {
    let _choosed: number[] = []
    let choosedEqual: boolean = false

    if (choosedCards.length < 2) {
      _choosed = [...choosedCards, cardInd]
    } else {
      _choosed = [cardInd]
    }

    if (_choosed.length === 2 && field[_choosed[0]].id === field[_choosed[1]].id) {
      choosedEqual = true
    }
    
    setChoosedCards(_choosed)
    setStep(step + 1)

    let _field = field.map((f, ind) => {
      if (choosedEqual && _choosed.includes(ind)) {
        return {...f, show: true, found: true}
      } else if (_choosed.includes(ind) || f.found) {
        return {...f, show: true}
      } else return {...f, show: false}
    })

    setField(_field)

    if (_field.every(f => f.found)) {
      if ([1,2].includes(level)) {
        setMode('loading')
        timeoutID = setTimeout(() => {
          fillField(level === 1 ? LEVEL_2 : LEVEL_3)
          setLevel(level + 1)
          setStep(0)
          setMode('start')
        }, 2000)
      } else {
        setLevel(1)
        setStep(0)
        setMode('end')
        fillField(LEVEL_1)
      }
    }
  }

  return ( 
    <div className='container'>
      <header className='header'>
        <h1 className='main-title'>Найди все совпадения</h1>
        <h3 className='rules'><span>Уровень {level}</span><span>Шаг {step}</span></h3>
      </header>
      <div className='playground'>
        {(mode === 'greeting' || mode === 'end') &&
          <div className='coverage'>
            <button className='button' onClick={startGame}>
              {mode === 'greeting' ? "Играть" : " Сыграть заново?"}
            </button>
          </div>
        }
        {mode === 'loading' &&
          <div className='coverage'>
            <button className='button'>Загружаем следующий уровень</button>
          </div>
        }
        <div className={`field level${level}`}>
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
