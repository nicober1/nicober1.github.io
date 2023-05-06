import React, {useState, useEffect} from 'react'
import {Timeline} from 'react-twitter-widgets'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
import Loading from '@site/src/pages/1Loading'
import HeaderTypeWriter from '@site/src/components/HeaderTypeWriter'

export default () => {
  return (
    <Loading>
      <>
        <div className='container mx-auto mt-10 text-center  dark:text-white'>
          <HeaderTypeWriter>Twitter Timelines</HeaderTypeWriter>
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

const profiles = ['CNBCTV18News', 'EconomicTimes','AlgoBoffin', 'vka27', 'Bhagirathsutar', 'Am_Shai']
