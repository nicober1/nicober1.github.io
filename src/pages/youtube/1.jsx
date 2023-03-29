import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Layout from '@theme/Layout'
import data from '/data/youtube11.json'


const formatNumber = (num) => {
  if (num < 1e9) return num
  return (num / 1e9).toFixed(1) + ' Billion'
}
export default function App() {
  
  return (
    <Layout noFooter>
      <div className='container mx-auto max-w-6xl'>
        <h1 className='text-center text-4xl font-bold '>YouTube's Most Viewed Videos</h1>
        <div className='flex flex-wrap justify-center'>
          {data.map((video) => {
            const {viewCount, videoId} = video
            return (
              <div className='m-4 w-full rounded border p-4 shadow-lg md:w-1/2 lg:w-1/3' key={videoId}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls width='100%' height='100%' />
                <h3 className='text-lg font-semibold'>Views: {formatNumber(viewCount)}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
