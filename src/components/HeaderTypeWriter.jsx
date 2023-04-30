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
      <h1 className='h-[5rem] w-[35rem] bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-center text-3xl  font-bold  text-transparent '>
        {text}
        <span className='animate-pulse text-cyan-500'>__</span>
      </h1>
    </div>
  )
}
