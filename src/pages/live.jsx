import React from 'react'
import Layout from '@theme/Layout'
import YouTubePlayer from '@site/src/components/YouTubePlayer'

const videoIds = [
  'JEg11Ps8w4M',
  '5F1Eyf5QN3o',
  '9Auq9mYxFEE',
  '0ThMultL4PY',
  'sYZtOFzM78M',
  'gCNeDWCI0vo',
  '9NyxcX3rhQs',
  'h3MuIUNCCzI',
]

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <YouTubePlayer videoIds={videoIds} />
    </Layout>
  )
}
