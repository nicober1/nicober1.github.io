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
      <div className='container mx-auto px-4'>
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
          <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: '100%'}} />
          <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: '100%'}} />
        </div>
      </div>
    </Layout>
  )
}
