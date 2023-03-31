import React, {useState, useEffect} from 'react'
import {Timeline} from 'react-twitter-widgets'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
import Loading from '@site/src/pages/1Loading'


const profiles = ['WhiteHouse', 'NASA', 'WHO','elonmusk','POTUS']

export default () => {
  return (
    <Loading>

      <>
        <div className='container mx-auto mt-10 dark:text-white  text-center'>
          <h1 className='text-4xl font-bold '>Twitter Timelines</h1>
          <p className='mt-4 text-xl text-cyan-500'>One-Stop place to get updates from Important Twitter Timelines</p>
        </div>
        <div className='container mx-auto mt-10 px-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {profiles.map((screenName) => (
              <>
                <TwitterTimelineEmbed
                  sourceType='profile'
                  screenName={screenName}
                  options={{height: 600, width: '100%'}}
                />
              </>
            ))}
          </div>
        </div>
      </>
    </Loading>
  )
}
