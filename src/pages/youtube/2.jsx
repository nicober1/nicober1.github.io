import React from 'react'
import Loading from '@site/src/pages/1Loading'

export default () => {
  const playlists = [
    'PL11E57E1166929B60',
    'PL095CA373D64B70C0',
    'PLirAqAtl_h2pRAtj2DgTa3uWIZ3-0LKTA',
    'PLHuHXHyLu7BEnMJNeVvkXpxapvDSp5UdI',
    'PLirAqAtl_h2pfPqZlV3j9WzYJJ_C426cr',
    'PLwinC5EAvucgCFyPfb9rSnOao6BHpQHAk',
    'PLirAqAtl_h2p_OhawuB23z-dY9ijrlQII',
    'PLirAqAtl_h2paOfFiwY-I62jFk2n07ayI',
    'PLBfdlSZHCQ-Q0v1x8AKYYyCHTuqdbolvh',
    'PLirAqAtl_h2r5g8xGajEwdXd3x1sZh8hC',
    'PLirAqAtl_h2o4xCWaBsDH3BKNQs8YqLCL',
    'PLirAqAtl_h2p57Njt3QJDtwxAPZENJrIp',
    'PLirAqAtl_h2rTbOXU2Oc-7WBBHmFrnyUC',
    'PL9bw4S5ePsEEqCMJSiYZ-KTtEjzVy0YvK',
    'PLRJNAhZxtqH95u2C7bmFmsyMz-mbl3R-_',
  ]

  return (
    <Loading time={2000}>
      <div className='container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-2'>
        {playlists.map((playlist) => (
          <iframe
            className='rounded-lg shadow-lg'
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/videoseries?list=${playlist}`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        ))}
      </div>
    </Loading>
  )
}
