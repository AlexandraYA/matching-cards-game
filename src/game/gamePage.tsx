import React, { useState, useContext, useEffect } from 'react'
import { CardsBase } from '../store/context'
import { Header } from './components/Header' 
import { Footer } from './components/Footer'
import { Card } from './components/Card'
import { Loading } from './components/Loading'
import { StartPanel } from './components/StartPanel'
import { TField } from '../store/types'


const LEVEL_1 = {steps: 20, cards: 6}
const LEVEL_2 = {steps: 40, cards: 12}
const LEVEL_3 = {steps: 80, cards: 24}

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
      fillField(LEVEL_1.cards)
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
      fillField(LEVEL_1.cards)
    }
    if (level !== 1) {
      setLevel(1)
    }
    setStep(LEVEL_1.steps)
    setMode('start')
  }

  const checkChoosedCards = (cardInd: number) => {
      if (choosedCards.length < 2) {
          return [...choosedCards, cardInd]
      } else return [cardInd]
  }

  const prepareCards = (choosedEqual: boolean, _choosed: number[]) => {
      return field.map((f: TField, ind: number) => {
        if (choosedEqual && _choosed.includes(ind)) {
          return {...f, show: true, found: true}
        } else if (_choosed.includes(ind) || f.found) {
          return {...f, show: true}
        } else return {...f, show: false}
      })
  }

  const checkIfEnd = (_field: TField[]) => {
      if (_field.every(f => f.found)) {
          if ([1,2].includes(level)) {
            setMode('loading')
            timeoutID = setTimeout(() => {
              fillField(level === 1 ? LEVEL_2.cards : LEVEL_3.cards)
              setLevel(level + 1)
              setStep(level === 1 ? LEVEL_2.steps : LEVEL_3.steps)
              setMode('start')
            }, 2000)
          } else {
            setLevel(1)
            setStep(LEVEL_1.steps)
            setMode('end')
            fillField(LEVEL_1.cards)
          }
      }
  }

  const openCard = (cardInd: number) => {
    let choosedEqual: boolean = false
    const _choosed: number[] = checkChoosedCards(cardInd)    

    if (_choosed.length === 2 && field[_choosed[0]].id === field[_choosed[1]].id) {
      choosedEqual = true
    }

    let _field = prepareCards(choosedEqual, _choosed)

    setChoosedCards(_choosed)
    setStep(step - 1)
    setField(_field)
    checkIfEnd(_field)
  }

  return ( 
    <div className='container'>
      <Header level={level} step={step} />
      <div className='playground'>
        {(mode === 'greeting' || mode === 'end') &&
          <StartPanel startGame={startGame} mode={mode} />
        }
        {mode === 'loading' && <Loading /> }
        <div className={`field level${level}`}>
          {field.map((card: TField, ind: number) => (
            <Card 
              ind={ind}
              card={card}
              openCard={openCard}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default GamePage
