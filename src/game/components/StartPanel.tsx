import React from "react"

interface IStartPanel {
  startGame: () => void;
  mode: string;
}

const StartPanel: React.FC<IStartPanel> = ({ startGame, mode }) => (
    <div className='coverage' data-testid="coverage">
        <button className='button' onClick={startGame}>
          {mode === 'endWin' ? "Вы выиграли!!!" : "Вы проиграли(("}<br/>
          Сыграть заново?
        </button>
    </div>
)

export { StartPanel }