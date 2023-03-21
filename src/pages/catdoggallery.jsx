import React from 'react'
import Layout from '@theme/Layout'
import ChangingCatImages from '@site/src/components/ChangingCatImages'
import ChangingDogImages from '@site/src/components/ChangingDogImages'
import ParticleApp from '@site/src/components/particles/2'


export default function () {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='flex'>
        <ChangingCatImages />
        <ChangingDogImages />
        <ParticleApp />
      </div>
    </Layout>
  )
}
