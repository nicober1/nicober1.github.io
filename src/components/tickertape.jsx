import React, {useState, useEffect, useMemo} from 'react'

const TradingViewWidget = ({vari}) => {
  useEffect(() => {
    const container = document.querySelector('.tradingview-ticker')
    const existingScript = container.querySelector('script')

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        showSymbolLogo: true,
        colorTheme: 'light',
        isTransparent: false,
        displayMode: 'compact',
        locale: 'en',
        symbols: vari,
      })

      container.appendChild(script)
    }

    return () => {
      const script = container.querySelector('script')
      if (script) {
        container.removeChild(script)
      }
    }
  }, [vari])

  return <div className='tradingview-ticker' />
}

const TickerTape = () => {
  const varies = useMemo(
    () => [
      {
        proName: 'TSLA',
        title: 'Tesla',
      },
      {
        proName: 'AAPL',
        title: 'Apple',
      },
      {
        proName: 'AMZN',
        title: 'Amazon',
      },
      {
        proName: 'MSFT',
        title: 'Microsoft',
      },
      {
        proName: 'META',
        title: 'Meta',
      },
      {
        proName: 'GOOGL',
        title: 'Alphabet Inc',
      },
      {
        proName: 'RELIANCE',
        title: 'Reliance Industries',
      },
      {
        proName: 'BITSTAMP:BTCUSD',
        title: 'Bitcoin',
      },
      {
        proName: 'BITSTAMP:ETHUSD',
        title: 'Ethereum',
      },
    ],
    [],
  )

  return <TradingViewWidget vari={varies} />
}

export default TickerTape
