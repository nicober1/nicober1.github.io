import Layout from '@theme/Layout'
import {VeAd, SqAd, WiAd} from '@site/src/Ad'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import ReactPlayer from 'react-player'

export default function Apod() {
  const [imageData, setImageData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=QIgeHgdldPiDZcZau70kio4cuw8mAr7dGWPMNSYI')
        setImageData(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])
  return (
    <Layout noFooter>
      <div className='container mx-auto'>
        <div className='container flex min-h-screen flex-col items-center justify-center '>
          {loading ? (
            <div className='flex h-full w-full items-center justify-center'>
              <svg className='h-12 w-12 animate-spin text-gray-400' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm16 0a8 8 0 01-8 8v4a10 10 0 0010-10h-4zm-8 4a4 4 0 100-8 4 4 0 000 8z' />
              </svg>
            </div>
          ) : imageData.media_type === 'image' ? (
            <img src={imageData.hdurl} alt={imageData.title} className='w-full max-w-screen-lg rounded-lg shadow-lg' />
          ) : (
            <ReactPlayer url={imageData.url} controls={true} />
          )}

          <div className='mt-8 flex w-full max-w-screen-lg flex-col items-center justify-center space-y-4'>
            <h1 className='text-3xl font-bold'>{imageData.title}</h1>
            <p className=''>{moment(imageData.date).format('LL')}</p>
            <p className=''>{imageData.explanation}</p>
          </div>
        </div>
        
      </div>
    </Layout>
  )
}
