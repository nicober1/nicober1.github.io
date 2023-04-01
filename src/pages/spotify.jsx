import React from 'react'
import Loading from '@site/src/pages/1Loading'

export default () => {
  const playlists = [
    '37i9dQZEVXbNG2KDcFcKOF',
    '37i9dQZEVXbMDoHDwVN2tF',
    '37i9dQZEVXbLRQDuF5jeBp',
    '37i9dQZEVXbLiRSasKsNU9',
    '37i9dQZEVXbKuaTI1Z1Afx',
    '37i9dQZF1DXb69UWhjrXsW',
    '37i9dQZF1DX0XUfTFmNBRM',
    '37i9dQZEVXbLp5XoPON0wI',
    '37i9dQZF1DX76Wlfdnj7AP',
    '37i9dQZF1DXbeoH5duhVIK',
  ]

  return (
    <Loading time={2000}>
      <div className='container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-4'>
        {playlists.map((playlist) => (
          <iframe
            style={{width: '100%', height: '500px'}}
            src={`https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator`}
            frameBorder='0'
            allowFullScreen
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
            className='rounded-xl'
          />
        ))}
      </div>
    </Loading>
  )
}
