import React from "react"

interface IStartPanel {
  startGame: () => void;
  mode: string;
}

const StartPanel: React.FC<IStartPanel> = ({ startGame, mode }) => (
    <div className='coverage'>
        <button className='button' onClick={startGame}>
          {mode === 'greeting' ? "Играть" : " Сыграть заново?"}
        </button>
    </div>
)

export { StartPanel }