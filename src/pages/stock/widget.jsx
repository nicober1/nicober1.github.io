import React, {useEffect} from 'react'
import Loading from '@site/src/pages/1Loading'
import HeaderTypeWriter from '@site/src/components/HeaderTypeWriter'

const AddSymbolInfoWidget = ({symbol}) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbol: `${symbol}`,
      width: '100%',
      height: '100%',
      locale: 'en',
      colorTheme: 'light',
      isTransparent: false,
    })
    const container = document.getElementById(`${symbol}`)
    container.appendChild(script)
  }, [symbol])

  return <div className=' w-[30rem]' id={symbol}></div>
}

function TradingViewWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        ['Apple', 'AAPL|1D'],
        ['Amazon', 'AMZN|1D'],
        ['Microsoft', 'MSFT|1D'],
      ],
      chartOnly: false,
      width: '100%',
      height: '100%',
      locale: 'en',
      colorTheme: 'light',
      autosize: false,
      showVolume: true,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'candlesticks',
      gridLineColor: 'rgba(0, 0, 255, 0.06)',
      upColor: '#22ab94',
      downColor: '#f7525f',
      borderUpColor: '#22ab94',
      borderDownColor: '#f7525f',
      wickUpColor: '#22ab94',
      wickDownColor: '#f7525f',
      dateFormat: 'MMM dd, yyyy',
    })

    const script1 = document.createElement('script')
    script1.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
    script1.async = true
    script1.innerHTML = JSON.stringify({
      colorTheme: 'dark',
      isTransparent: false,
      width: '100%',
      height: '100%',
      locale: 'en',
      importanceFilter: '0,1',
      currencyFilter: 'USD,EUR,ITL,NZD,CHF,AUD,FRF,JPY,ZAR,TRL,CAD,DEM,MXN,ESP,GBP',
    })

    const container = document.getElementById('tv-container')
    container.appendChild(script)
    const container1 = document.getElementById('tv-container-1')
    container1.appendChild(script1)
  }, [])

  return (
    <Loading time={0}>
      <div className='container'>
        <HeaderTypeWriter>Stock Market Widgets</HeaderTypeWriter>
        <div className='h-[30rem] w-[80rem]' id='tv-container'></div>
        <div className='h-[30rem] w-[80rem]' id='tv-container-1'></div>
        <div className='container grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2'>
          <AddSymbolInfoWidget symbol='AAPL' />
          <AddSymbolInfoWidget symbol='MSFT' />
          <AddSymbolInfoWidget symbol='GOOG' />
          <AddSymbolInfoWidget symbol='AMZN' />
        </div>
      </div>
    </Loading>
  )
}

export default TradingViewWidget
