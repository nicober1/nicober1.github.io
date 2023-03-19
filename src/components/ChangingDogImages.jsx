import React, {useState, useEffect} from 'react'

const ChangingDogImages = () => {
  const [dogImageUrls, setDogImageUrls] = useState([])

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=1')
        const data = await response.json()
        setDogImageUrls(data.map((dog) => dog.url))
      } catch (error) {
        console.log('Error fetching dog images:', error)
      }
    }

    const intervalId = setInterval(() => {
      fetchDogImages()
    },5000)

    fetchDogImages()

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='container mx-auto'>
      <h2 className='mb-6 text-3xl font-bold text-center'>Random Dog Gallery</h2>
      <div className='grid grid-cols-3 gap-4'>
        {dogImageUrls.map((dogImageUrl) => (
          <div key={dogImageUrl}>
            <img src={dogImageUrl} alt='Random Dog' className='rounded-lg shadow-md' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChangingDogImages
