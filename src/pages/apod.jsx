import React from 'react'
import Layout from '@theme/Layout'
import NASAImage from '@site/src/components/NASAImage'
import {VeAd,SqAd,WiAd} from '@site/src/Ad'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='container mx-auto'>
        <NASAImage />
        <VeAd />
        <SqAd />
        <WiAd />
      </div>
    </Layout>
  )
}
