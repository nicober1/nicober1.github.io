// TradingViewWidget.jsx
import React, {useEffect, useRef, memo} from 'react'

function Overview() {
  const contariner = useRef()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1D"
            ]
          ],
          "chartOnly": false,
          "width": 1000,
          "height": 500,
          "locale": "en",
          "colorTheme": "light",
          "autosize": false,
          "showVolume": true,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "Trebuchet MS, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "candlesticks",
          "gridLineColor": "rgba(0, 0, 255, 0.06)",
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f",
          "dateFormat": "MMM dd, yyyy"
        }`
    contariner.current.appendChild(script)
  }, [])

  return (
    <div className='tradingview-widget-container1' ref={contariner}>
    </div>
  )
}

export default memo(Overview)
