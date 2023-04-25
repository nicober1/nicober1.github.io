import React, {useState, useEffect} from 'react'

// A custom hook to fetch data from a URL
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return {data, loading, error}
}

// A component to display a single image
function ImageCard({image}) {
  return (
    <div className='max-w-sm overflow-hidden rounded shadow-lg'>
      <img className='w-full' src={image.img_src} alt={`Mars rover image taken on ${image.earth_date}`} />
      <div className='px-6 py-4'>
        <div className='mb-2 text-xl font-bold'>Mars Rover Image</div>
        <p className='text-base text-gray-700'>
          This image was taken by the {image.rover.name} rover on {image.earth_date} using the {image.camera.full_name}{' '}
          camera.
        </p>
      </div>
    </div>
  )
}

// A component to display a grid of images
function ImageGrid({images}) {
  return (
    <div className='container mx-auto'>
      <h1 className='my-8 text-center text-4xl font-bold'>Latest Images from Mars</h1>
      <div className='grid grid-cols-3 gap-4'>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}

// A component to display a loading message
function Loading() {
  return (
    <div className='container mx-auto'>
      <h1 className='my-8 text-center text-4xl font-bold'>Loading...</h1>
    </div>
  )
}

// A component to display an error message
function Error({error}) {
  return (
    <div className='container mx-auto'>
      <h1 className='my-8 text-center text-4xl font-bold'>Error</h1>
      <p className='text-center text-red-600'>{error.message}</p>
    </div>
  )
}

// The main component that uses the custom hook and renders the appropriate component
function App() {
  // The URL for the NASA API to get the latest images from Curiosity rover
  const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY'

  // Use the custom hook to fetch the data
  const {data, loading, error} = useFetch(url)

  // Render the appropriate component based on the state
  if (loading) {
    return <Loading />
  } else if (error) {
    return <Error error={error} />
  } else {
    return <ImageGrid images={data.latest_photos} />
  }
}

export default App
