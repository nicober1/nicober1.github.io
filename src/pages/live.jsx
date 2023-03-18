import React from 'react'
import Layout from '@theme/Layout'
import YouTubePlayer from '@site/src/components/YouTubePlayer'


const videos = [
  {id: 'h3MuIUNCCzI', title: 'France 24'},
  {id: '5F1Eyf5QN3o', title: 'WION'},
  {id: '9Auq9mYxFEE', title: 'SKY NEWS'},
  {id: '0ThMultL4PY', title: 'National Geographic'},
  {id: 'sYZtOFzM78M', title: 'India Today'},
  {id: 'gCNeDWCI0vo', title: 'Al Jazeera'},
  {id: '9NyxcX3rhQs', title: 'CNBC'},
]

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='container mx-auto'>
        <YouTubePlayer videos={videos} />
      </div>
    </Layout>
  )
}
