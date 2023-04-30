import React, {useState, useEffect} from 'react'

const ChangingCatImages = () => {
  const [catImageUrls, setCatImageUrls] = useState([])

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1')
        const data = await response.json()
        setCatImageUrls(data.map((cat) => cat.url))
      } catch (error) {
        console.log('Error fetching cat images:', error)
      }
    }

    const intervalId = setInterval(() => {
      fetchCatImages()
    }, 5000)

    fetchCatImages()

    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      {catImageUrls.map((catImageUrl) => (
        <div key={catImageUrl}>
          <img src={catImageUrl} alt='Random Cat' className='rounded-lg shadow-md ' />
        </div>
      ))}
    </>
  )
}

export default ChangingCatImages
