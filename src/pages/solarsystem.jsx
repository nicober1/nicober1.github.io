import React from 'react'
import Layout from '@theme/Layout'
import SolarSystem1 from '@site/src/components/solarsystem/1'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className=''>
        <div className='container'>
          <SolarSystem1 />
        </div>
      </div>
    </Layout>
  )
}
