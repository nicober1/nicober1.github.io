import React from 'react'
import Layout from '@theme/Layout'
import SolarSystem1 from '@site/src/components/graphics/1'
import SolarSystem2 from '@site/src/components/graphics/2'
import ThreeScene from '@site/src/components/graphics/3'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div class='flex flex-wrap'>
        <div class='basis-1/2 border-solid dark:border-white'>
          <SolarSystem2 />
        </div>
        <div class='basis-1/2 border-solid dark:border-white'>
          <SolarSystem1 />
        </div>
        <div class='basis-1/2 border-solid dark:border-white'>
          <ThreeScene />
        </div>
      </div>
    </Layout>
  )
}
