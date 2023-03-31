import React from 'react'
import Loading from '@site/src/pages/1Loading'

export default () => {
  return (
    <Loading time={2000}>
      <iframe
        src='https://www.meteoblue.com/en/weather/maps/widget?windAnimation=0&windAnimation=1&gust=0&gust=1&satellite=0&satellite=1&cloudsAndPrecipitation=0&cloudsAndPrecipitation=1&temperature=0&temperature=1&sunshine=0&sunshine=1&extremeForecastIndex=0&extremeForecastIndex=1&geoloc=detect&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=1&autowidth=auto'
        allowTransparency='true'
        sandbox='allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox'
        style={{width: '100%', height: '720px'}}
      />
    </Loading>
  )
}
