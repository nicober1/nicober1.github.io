import React from 'react'
import Layout from '@theme/Layout'
import Clock from '@site/src/components/Clock'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <h1 className='mt-10 dark:text-shadow-lg mx-auto text-center text-4xl font-bold text-black dark:text-white'>
        Timezones
      </h1>

      <div className='container'>
        <Clock />
      </div>
    </Layout>
  )
}
