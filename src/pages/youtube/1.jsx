import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import data from '/data/youtube11.json'
import DonateButton from '@site/src/components/DonateButton'
import Loading from '@site/src/pages/1Loading'

const formatNumber = (num) => {
  if (num < 1e9) return num
  return (num / 1e9).toFixed(1) + ' Billion'
}
export default function App() {
  return (
    <Loading>
      <div className='container mx-auto my-auto mt-10'>
        <h1 className='mt-5 text-center text-4xl font-bold '>YouTube's Most Viewed Videos</h1>
        <div className='flex flex-wrap justify-center'>
          {data.map((video) => {
            const {viewCount, videoId} = video
            return (
              <div className='m-4 w-full rounded border p-4 shadow-lg md:w-1/2 lg:w-1/3' key={videoId}>
                {/* <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls width='100%' height='100%' /> */}
                <iframe
                  className='rounded-lg shadow-lg'
                  width='100%'
                  height='315'
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title}
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                ></iframe>
                <h3 className='text-lg font-bold'>Views: {formatNumber(viewCount)}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </Loading>
  )
}
