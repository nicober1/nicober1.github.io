import React from 'react'
import Layout from '@theme/Layout'
import NASAImage from '@site/src/components/NASAImage'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='container mx-auto'>
        <NASAImage />
      </div>
    </Layout>
  )
}
