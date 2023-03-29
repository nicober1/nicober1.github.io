import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Layout from '@theme/Layout'
const videoIds = ['XqZsoesa55w', 'kJQP7kiw5Fk', 'F4tHL8reNCs']
const formatNumber = (num) => {
  if (num < 1e9) return num
  return (num / 1e9).toFixed(1) + ' Billion'
}
export default function App() {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'statistics',
          id: videoIds.join(','),
          key: 'AIzaSyC7aNg_UBZlCHC13MHukveVKEcstbXruSg',
        },
      })
      setVideos(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout noFooter>
    <div className='container mx-auto max-w-6xl'>
      <h1 className='text-center text-4xl font-bold '>YouTube's Most Viewed Videos</h1>
      <div className='flex flex-wrap justify-center'>
        {videos.map((video) => {
          const {id, statistics} = video
          return (
            <div className='m-4 w-full rounded border p-4 shadow-lg md:w-1/2 lg:w-1/3' key={id}>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls width='100%' height='100%' />
              <h3 className='text-lg font-semibold'>Views: {formatNumber(statistics.viewCount)}</h3>
            </div>
          )
        })}
      </div>
    </div>
    </Layout>
  )
}
