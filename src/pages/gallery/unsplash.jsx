import React, {useState, useEffect} from 'react'
import {faker} from '@faker-js/faker'
import Layout from '@theme/Layout'
import HeaderTypeWriter from '@site/src/components/HeaderTypeWriter'

function generateRandomWords(numWords) {
  const words = []
  for (let i = 0; i < numWords; i++) {
    words.push(faker.random.word())
  }
  return words
}

export default function App() {
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    const urls = []
    const randomWords = generateRandomWords(1000)

    for (let i = 0; i < 2000; i++) {
      const randomIndex = Math.floor(Math.random() * randomWords.length)
      const randomWord = randomWords[randomIndex]
      const randomNum = Math.floor(Math.random() * 900000) + 100000
      const randomNum1 = Math.floor(Math.random() * 900000) + 100000
      const randomNum2 = Math.floor(Math.random() * 900000) + 100000
      const randomNum3 = Math.floor(Math.random() * 30) + 100000
      const randomNum4 = Math.floor(Math.random() * 900000) + 100000
      const randomNum5 = Math.floor(Math.random() * 900000) + 100000
      const randomNum6 = Math.floor(Math.random() * 20) + 100000
      const randomNum7 = Math.floor(Math.random() * 900000) + 100000
      const randomNum8 = Math.floor(Math.random() * 10) + 100000
      const randomNum9 = Math.floor(Math.random() * 900000) + 100000
      const randomNum10 = Math.floor(Math.random() * 100) + 100000

      const url = `https://source.unsplash.com/random/1920x1080?${randomWord}&timestamp=${Date.now()}&random=${
        randomNum +
        randomNum1 +
        randomNum2 +
        randomNum3 +
        randomNum4 +
        randomNum5 +
        randomNum6 +
        randomNum7 +
        randomNum8 +
        randomNum9 +
        randomNum10
      }`

      urls.push(url)
    }
    setImageUrls(urls)
  }, [])

  const downloadImage = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'image.jpg')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((err) => console.log('Error', err))
  }

  return (
    <Layout noFooter>
      <div className='container mx-auto mt-10 text-center  dark:text-white'>
        <HeaderTypeWriter>Image Gallery @ Unsplash</HeaderTypeWriter>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3'>
          {imageUrls.map((url, index) => (
            <div key={index} className='relative'>
              <img
                src={url}
                alt='Random image'
                className='h-auto w-full transform transition-all duration-300 ease-in-out hover:scale-150'
              />
              <button
                onClick={() => downloadImage(url)}
                className='absolute bottom-4 right-4 rounded bg-gray-800 px-4 py-2 text-white'>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
