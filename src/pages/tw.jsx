import React from 'react'
import Layout from '@theme/Layout'
import {Timeline} from 'react-twitter-widgets'
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed'

export default function SolarModel() {
  return (
    <Layout noFooter>
      <div className='container mx-auto my-auto bg-gradient-to-r from-blue-400 to-red-600 py-5  px-5 text-center'>
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
          <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='JoeBiden' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='POTUS' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='elonmusk' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='narendramodi' options={{height: 400, width: '100%'}} />
        </div>
      </div>
    </Layout>
  )
}
