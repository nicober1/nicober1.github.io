import React from 'react'
import Layout from '@theme/Layout'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='livenews-page'>
      <div class='flex-row gap-2'>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/JEg11Ps8w4M'>
          NBC
        </iframe>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/5F1Eyf5QN3o'>
          WION
        </iframe>
      </div>
    </Layout>
  )
}
