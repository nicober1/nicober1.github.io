import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import Layout from '@theme/Layout'
import {BounceLoader} from 'react-spinners'
import {Timeline} from 'react-twitter-widgets'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

const profiles = ['WhiteHouse', 'NASA', 'WHO']

export default () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <Layout noFooter>
      <div>
        <div
          className={`flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 ${
            loading ? '' : 'hidden'
          }`}>
          <Spinner animation='border' />
          <BounceLoader color='#FFFFFF' size={150} />
        </div>
        <div className={`${loading ? 'hidden' : ''}`}>
          <>
            <div className='container mx-auto mt-10 bg-gradient-to-r from-blue-400 to-red-600 text-center'>
              <h1 className='text-4xl font-bold text-white'>Twitter Timelines</h1>
              <p className='mt-4 text-xl text-white'>One-Stop place to get updates from Important Twitter Timelines</p>
            </div>
            <div className='container mx-auto mt-10 px-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {profiles.map((screenName) => (
                  <>
                    <TwitterTimelineEmbed
                      sourceType='profile'
                      screenName={screenName}
                      options={{height: 400, width: '100%'}}
                    />
                  </>
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  )
}
