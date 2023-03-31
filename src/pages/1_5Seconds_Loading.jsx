import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {BounceLoader} from 'react-spinners'

const Loading = ({children}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 8000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      <div
        className={`flex h-screen flex-col items-center justify-center bg-black ${
          loading ? '' : 'hidden'
        }`}>
        <p className='mt-4 text-4xl text-white'>Please wait while we load your content...</p>
        <BounceLoader color='red' size={150} />
        <svg viewBox='0 0 100 100' width='100' height='100'>
          <circle cx='50' cy='50' r='45' fill='none' stroke-width='10' stroke-dasharray='283' stroke-dashoffset='141.5'>
            <animate attributeName='stroke-dashoffset' values='141.5;0;141.5' dur='1.5s' repeatCount='indefinite' />
            <animate
              attributeName='stroke'
              values='#ff0000;#00ff00;#0000ff;#ff0000'
              dur='1.5s'
              repeatCount='indefinite'
            />
          </circle>
        </svg>
      </div>
      <div className={`${loading ? 'hidden' : ''}`}>{children}</div>
    </div>
  )
}

export default Loading
