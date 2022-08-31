import React from 'react'

interface IHeader {
  level: number;
  step: number;
}

const Header: React.FC<IHeader> = ({ level, step }) => (
    <header className='header'>
      <h1 className='main-title'>Найди все совпадения</h1>
      <h3 className='rules'><span>Уровень {level}/3</span><span>Осталось попыток {step}</span></h3>
    </header>
)

export { Header }
