import React, {useEffect} from 'react'
import Loading from '@site/src/pages/1Loading'

const TradingViewWidget = ({stockSymbol}) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      interval: '1m',
      width: 350,
      isTransparent: false,
      height: 400,
      symbol: `NSE:${stockSymbol}`,
      showIntervalTabs: true,
      locale: 'en',
      colorTheme: 'dark',
    })
    document.querySelector(`.tradingview-${stockSymbol}`).appendChild(script)
  }, [stockSymbol])

  return <div className={`tradingview-${stockSymbol}`} />
}

const App = () => {
  const stocks = ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'HDFC', 'ITC', 'MARUTI', 'ICICIBANK', 'AXISBANK', 'SBIN']

  return (
    <Loading time={2000}>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {stocks.map((stock) => (
          <TradingViewWidget key={stock} stockSymbol={stock} />
        ))}
      </div>
    </Loading>
  )
}

export default App
