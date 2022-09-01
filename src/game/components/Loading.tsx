import React from "react"


const Loading: React.FC = () => (
    <div className='coverage'>
        <div className='loading'>
          <p>Загружаем следующий уровень</p>
          <div className="loader"><div className="flipper"></div></div>
        </div>
    </div>
)

export { Loading }
