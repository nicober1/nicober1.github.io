import React from 'react'

const YouTubePlayer = ({videoIds}) => {
  return (
    <div className='flex flex-wrap'>
      {videoIds.map((videoId) => (
        <div className='w-full p-4 md:w-1/2 lg:w-1/3' key={videoId}>
          <iframe
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`YouTube video player for video with ID ${videoId}`}
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen></iframe>
        </div>
      ))}
    </div>
  )
}

export default YouTubePlayer
