// Import React and useEffect hook
import React, {useEffect, useState} from 'react'

// Import ReactPlayer component
import ReactPlayer from 'react-player'

// Import videos JSON file
import videos from '/data/yt/1.json'

// Define a custom component
function YouTubeVideos() {
  // Define a state variable to store the data
  const [data, setData] = useState([])

  // Use useEffect hook to load the data from the JSON file when the component mounts
  useEffect(() => {
    // Update the state with the data from the JSON file
    setData(videos.items)
  }, []) // Pass an empty dependency array to run only once

  // Return the JSX elements to render
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-4xl font-bold text-blue-600'>YouTube Videos</h1>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
        {data && data.length > 0 ? ( // Check if data array exists and has some items
          data.map(
            (
              item, // Map over the data array and render each item as a ReactPlayer element
            ) => (
              <div key={item.id} className='card overflow-hidden rounded-lg shadow-lg bg-black'>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${item.id}`} controls width='100%' height='100%' /> 
                <div className='card-body bg-black p-4'>
                </div>
              </div>
            ),
          )
        ) : (
          // Render a loading message if data array is empty or undefined
          <p className='text-center text-xl text-gray-600'>Loading...</p>
        )}
      </div>
    </div>
  )
}

// Export the component
export default YouTubeVideos
