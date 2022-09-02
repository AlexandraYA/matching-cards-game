import React from "react"
import { Loader } from "./Loader/Loader"


const Loading: React.FC = () => (
    <div className='coverage'>
        <div className='loading'>
          <p>Загружаем следующий уровень</p>
          <Loader />
        </div>
    </div>
)

export { Loading }
