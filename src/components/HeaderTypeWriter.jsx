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
    <div className='flex justify-center'>
      <h1 className='text-3xl w-[35rem] h-[5rem] text-center font-bold from-purple-600 via-pink-600 to-yellow-600 bg-gradient-to-r  text-transparent  bg-clip-text '>
        {text}
        <span className='text-cyan-500 animate-pulse'>__</span>
      </h1>
    </div>
  )
}
