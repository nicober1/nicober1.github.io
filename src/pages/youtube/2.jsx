import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'

// Define the API key and the category id for Music
const API_KEY = 'AIzaSyC7aNg_UBZlCHC13MHukveVKEcstbXruSg'
const CATEGORY_ID = 10

// Define the base URL for the videos.list method
const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos'

export default function TopVideos() {
  // Define a state variable to store the videos array
  const [videos, setVideos] = useState([])

  // Define a useEffect hook to fetch the data when the component mounts
  useEffect(() => {
    // Define an async function to make the API request
    const fetchData = async () => {
      try {
        // Use axios to get the response from the API
        const response = await axios.get(BASE_URL, {
          params: {
            part: 'snippet',
            chart: 'mostPopular',
            videoCategoryId: CATEGORY_ID,
            maxResults: 50,
            key: API_KEY,
          },
        })
        // Set the videos state with the items array from the response
        setVideos(response.data.items)
      } catch (error) {
        // Handle any errors
        console.error(error)
      }
    }
    // Invoke the async function
    fetchData()
  }, [])

  // Return the JSX element to render the videos
  return (
    <div className='container mx-auto max-w-6xl'>
      <h1 className='text-center text-4xl font-bold'>YouTube's Most Viewed Videos in Music</h1>
      <div className='flex flex-wrap justify-center'>
        {videos.map((video) => {
          // Destructure the video id and snippet from each video object
          const {id, snippet} = video
          // Return a JSX element for each video
          return (
            <div className='m-4 w-full rounded border p-4 shadow-lg md:w-1/2 lg:w-1/3' key={id}>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls width='100%' height='100%' />
              <h3 className='text-lg font-semibold'>{snippet.title}</h3>
              <p className='text-sm text-gray-600'>{snippet.channelTitle}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
