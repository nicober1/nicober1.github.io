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
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'WhiteHouse',
        }}
        options={{
          height: 400,
          width: 400,
        }}
      />
      <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: 400}} />
      <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: 400}} />
      <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: 400}} />
      <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: 400}} />
      <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: 400}} />
      <TwitterTimelineEmbed sourceType='profile' screenName='WhiteHouse' options={{height: 400, width: 400}} />
    </Layout>
  )
}
