import React from 'react'
import Layout from '@theme/Layout'
import Clock from '@site/src/components/Clock'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='container'>
        <Clock />
      </div>
    </Layout>
  )
}
