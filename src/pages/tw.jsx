import React, {useState, useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import Layout from '@theme/Layout'
import {BounceLoader} from 'react-spinners'
import {Timeline} from 'react-twitter-widgets'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

export default function () {
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
          className='d-flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600'
          style={{display: loading ? 'flex' : 'none'}}>
          <Spinner animation='border' />
          <BounceLoader color='#FFFFFF' size={150} />
        </div>
        <div style={{display: loading ? 'none' : 'block'}}>
          <>
            <div className='container mx-auto mt-10 bg-gradient-to-r from-blue-400 to-red-600  text-center'>
              <h1 className='text-4xl font-bold text-white'>Twitter Timelines</h1>
              <p className='mt-4 text-xl text-white'>One-Stop place to get updates from Important Twitter Timelines</p>
            </div>
            <div className='container mx-auto mt-10 px-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'WhiteHouse',
                  }}
                  options={{
                    height: 400,
                    width: '100%',
                  }}
                />
                <TwitterTimelineEmbed
                  sourceType='profile'
                  screenName='WhiteHouse'
                  options={{height: 400, width: '100%'}}
                />
                <TwitterTimelineEmbed
                  sourceType='profile'
                  screenName='JoeBiden'
                  options={{height: 400, width: '100%'}}
                />
                <TwitterTimelineEmbed sourceType='profile' screenName='POTUS' options={{height: 400, width: '100%'}} />
                <TwitterTimelineEmbed
                  sourceType='profile'
                  screenName='elonmusk'
                  options={{height: 400, width: '100%'}}
                />
                <TwitterTimelineEmbed
                  sourceType='profile'
                  screenName='narendramodi'
                  options={{height: 400, width: '100%'}}
                />
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  )
}
