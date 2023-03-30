import React from 'react'
import Layout from '@theme/Layout'

export default function SolarModel() {
  return (
    <Layout noFooter>
      <div className='mt-20' style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10}}>
        <iframe
          src='https://eyes.nasa.gov/apps/asteroids/#/asteroids?embed=true'
          width='100%'
          height='100%'
          style={{border: '0'}}
        />
      </div>
    </Layout>
  )
}
