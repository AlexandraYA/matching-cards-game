import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import GamePage from './game/gamePage';
import { cards } from './store/store'
import { CardsBase } from './store/context'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CardsBase.Provider value={cards}>
    <React.StrictMode>
      <GamePage />
    </React.StrictMode>
  </CardsBase.Provider>
);
