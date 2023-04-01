import React, {useEffect} from 'react'
import Loading from '@site/src/pages/1Loading'
import Overview from './overview'
import TickerTape from '@site/src/components/tickertape'

const App = () => {
  return (
    <Loading time={2000}>
      <div className='mt-10'>
        <TickerTape />
      </div>
      <div className='mt-10'>
        <Overview />
      </div>
    </Loading>
  )
}

export default App
