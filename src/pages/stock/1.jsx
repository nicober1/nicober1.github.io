import React, {useEffect} from 'react'

function TradingViewWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [['Apple', 'AAPL|1D']],
      chartOnly: false,
      width: 1000,
      height: 500,
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
      width: '510',
      height: '600',
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
    <>
      <div id='tv-container'></div>
      <div id='tv-container-1'></div>
    </>
  )
}

export default TradingViewWidget
