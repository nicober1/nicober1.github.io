import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {BounceLoader} from 'react-spinners'
import Layout from '@theme/Layout'
import DonateButton from '@site/src/components/DonateButton'
import RotatingEarth from '@site/src/components/RotatingEarth'


const Loading = ({children, time = 8000}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, time)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Layout noFooter>
      <DonateButton />

      <div>
        <div className={`flex h-screen flex-col items-center justify-center  bg-black ${loading ? '' : 'hidden'}`}>
          <p className='mt-5 text-3xl text-white'>Enjoy view of Earth while we load your content...</p>
          <RotatingEarth  />
        </div>
        <div className='mt-10 mx-auto my-auto container overflow-clip'>
          <div className={`${loading ? 'hidden' : ''}`}>{children}</div>
        </div>
      </div>
    </Layout>
  )
}

export default Loading
