import React, {useEffect} from 'react'
import Loading from '@site/src/pages/1Loading'

const TradingViewWidget = ({vari}) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      width: 1200,
      height: 400,
      defaultColumn: vari,
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      colorTheme: 'dark',
      locale: 'en',
    })
    document.querySelector(`.tradingview-${vari}`).appendChild(script)
  }, [vari])

  return <div className={`tradingview-${vari}`} />
}

const App = () => {
  const varies = ['overview', 'performance', 'oscillators', 'moving_averages']

  return (
    <Loading time={2000}>
      <div className='grid grid-cols-1 gap-5'>
        {varies.map((vari) => (
          <TradingViewWidget key={vari} vari={vari} />
        ))}
      </div>
    </Loading>
  )
}

export default App
