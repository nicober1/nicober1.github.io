import {useState, useEffect} from 'react'

export default function TypewriterHeader({children}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(children.slice(0, index))
      setIndex((prevIndex) => prevIndex + 1)
    }, 100)

    return () => clearInterval(intervalId)
  }, [children, index])

  return (
    <h1 className='text-4xl font-bold text-red-500 text-center justify-center'>
      {text}
      <span className='animate-pulse'>|</span>
    </h1>
  )
}
