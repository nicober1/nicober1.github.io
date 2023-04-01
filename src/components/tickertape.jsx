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
        proName: 'FOREXCOM:SPXUSD',
        title: 'S&P 500',
      },
      {
        proName: 'FOREXCOM:NSXUSD',
        title: 'US 100',
      },
      {
        proName: 'FX_IDC:EURUSD',
        title: 'EUR/USD',
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
    [], // add an empty dependency array
  )

  return <TradingViewWidget vari={varies} />
}

export default TickerTape
