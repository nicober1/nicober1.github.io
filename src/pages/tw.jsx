import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'
import {Timeline} from 'react-twitter-widgets'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
import Loading from './1_5Seconds_Loading'

const profiles = ['WhiteHouse', 'NASA', 'WHO']

export default () => {
  return (
    <Layout noFooter>
      <Loading>
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
      </Loading>
    </Layout>
  )
}
