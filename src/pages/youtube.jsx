import React, {useEffect, useState} from 'react'

import ReactPlayer from 'react-player'

import videos from '/data/yt/1.json'

function YouTubeVideos() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(videos.items)
  }, []) 

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-4xl font-bold'>YouTube Videos</h1>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data && data.length > 0 ? ( 
          data.map(
            (
              item, 
            ) => (
              <div key={item.id} className='card'>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${item.id}`} controls />
                <div className='card-body'>
                  <h3 className='card-title truncate text-lg font-semibold'> {item.snippet.title} </h3>
                  <p className='card-text text-sm text-gray-500'> {item.snippet.channelTitle} </p>
                </div>
              </div>
            ),
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default YouTubeVideos
