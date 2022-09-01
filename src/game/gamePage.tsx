import React, { useState, useContext, useEffect } from 'react'
import { CardsBase } from '../store/context'
import { Header } from './components/Header' 
import { Footer } from './components/Footer'
import { Card } from './components/Card'
import { Loading } from './components/Loading'
import { StartPanel } from './components/StartPanel'
import { TField } from '../store/types'


type TModes = 'start' | 'endFail' | 'endWin' | 'loading'

const LEVEL_1 = {steps: 20, cards: 6}
const LEVEL_2 = {steps: 40, cards: 12}
const LEVEL_3 = {steps: 80, cards: 24}

let timeoutID: any = null
const delay = 2000


const GamePage: React.FC = () => {
  const cards = useContext(CardsBase);

  const  [ level, setLevel ] = useState<number>(1)
  const  [ mode, setMode ] = useState<TModes>('start')
  const  [ step, setStep ] = useState<number>(LEVEL_1.steps)
  const  [ choosedCards, setChoosedCards ] = useState<number[]>([])
  const  [ field, setField ] = useState<TField[]>([])

  useEffect(() => {
    fillField(LEVEL_1.cards)

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

  const reStartGame = () => {
    setMode('start')
    fillField(LEVEL_1.cards)
    setStep(LEVEL_1.steps)
    setLevel(1)
  }

  const checkChoosedCards = (cardInd: number): number[] => {
      if (choosedCards.includes(cardInd)) {
          return choosedCards
      } else {
          if (choosedCards.length < 2) {
              return [...choosedCards, cardInd]
          } else return [cardInd]
      }
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

  const endGame = (endMode: string) => {
      setMode(endMode as TModes)
      setChoosedCards([])
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
            }, delay)
          } else {
            endGame('endWin')
          }
      } else if (step === 0) {
        endGame('endFail')
      }
  }

  const openCard = (cardInd: number) => {
    let choosedEqual: boolean = false
    const _choosed: number[] = checkChoosedCards(cardInd)

    if (_choosed.length === 2) {
        if (field[_choosed[0]].id === field[_choosed[1]].id) {
            choosedEqual = true
        } else if (_choosed.length === 2) {
            setStep(step - 1)
        }
    }

    let _field = prepareCards(choosedEqual, _choosed)

    setChoosedCards(_choosed)
    setField(_field)
    checkIfEnd(_field)
  }

  return ( 
    <div className='container' data-testid="container">
      <Header level={level} step={step} />
      <div className='playground'>
        {(mode === 'endFail' || mode === 'endWin') &&
          <StartPanel startGame={reStartGame} mode={mode} />
        }
        {mode === 'loading' && <Loading /> }
        <div className={`field level${level}`} data-testid="field">
          {field.map((card: TField, ind: number) => (
            <Card 
              key={ind}
              card={card}
              openCard={() => openCard(ind)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default GamePage
