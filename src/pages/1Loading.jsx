import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {BounceLoader} from 'react-spinners'
import Layout from '@theme/Layout'
import DonateButton from '@site/src/components/DonateButton'

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
    <Layout noFooter>
      <DonateButton />

      <div>
        <div className={`flex h-screen flex-col items-center justify-center gap-4 bg-black ${loading ? '' : 'hidden'}`}>
          <p className='mt-4 text-2xl text-white'>Please wait while we load your content...</p>
          <BounceLoader color='red' size={150} />
        </div>
        <div className={`${loading ? 'hidden' : ''}`}>{children}</div>
      </div>
    </Layout>
  )
}

export default Loading
