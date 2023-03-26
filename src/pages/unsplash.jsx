import React, {useState, useEffect} from 'react'

export default function App() {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const delay = imageUrl ? 2000 : 0
    new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
      fetch('https://source.unsplash.com/random')
        .then((res) => setImageUrl(res.url))
        .catch((err) => console.log('Error', err))
    })
  }, [imageUrl])

  const downloadImage = () => {
    fetch(imageUrl)
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
    <div>
      <img src={imageUrl} alt='Random image' />
      <button onClick={downloadImage}>Download</button>
    </div>
  )
}
