import React from 'react'

const YouTubePlayer = ({videos}) => {
  return (
    <div className='flex flex-wrap'>
      {videos.map((video) => (
        <div key={video.id} className='w-full flex-auto p-4 md:w-1/2 lg:w-1/3'>
          <iframe
            className='rounded-lg shadow-lg'
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen></iframe>
          <h2 className='text-center text-lg font-medium'>{video.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default YouTubePlayer
