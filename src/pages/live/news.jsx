import React from 'react'
import Layout from '@theme/Layout'


const videos = [
  {id: 'gCNeDWCI0vo', title: 'Al Jazeera'},
  {id: 'h3MuIUNCCzI', title: 'France 24'},
  {id: '5F1Eyf5QN3o', title: 'WION'},
  {id: '9Auq9mYxFEE', title: 'SKY NEWS'},
  {id: '9NyxcX3rhQs', title: 'CNBC'},
  {id: 'XWq5kBlakcQ', title: 'CNA'},
  {id: '4Tr2xGIUfZg', title: 'CNN-News18'},
]

const YouTubePlayer = ({videos}) => {
  return (
    <div className='flex flex-wrap'>
      {videos.map((video) => (
        <div key={video.id} className='w-full flex-auto p-4 md:w-1/2 lg:w-1/3'>
          <iframe
            className='rounded-lg shadow-lg'
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen></iframe>
          <h2 className='text-center text-lg font-medium'>{video.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='container mx-auto'>
        <YouTubePlayer videos={videos} />
      </div>
    </Layout>
  )
}
