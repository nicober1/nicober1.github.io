import React from 'react'
import Layout from '@theme/Layout'
import BookmarkPage from '@site/src/components/BookmarkPage'

const videoIds = [
  {url: 'https://chat.openai.com', title: 'ChatGPT', description: 'Chatbot using Artificial Intelligence'},
  {url: 'https://www.youtube.com', title: 'YouTube', description: 'Video Platform'},
  {url: 'https://edition.cnn.com', title: 'CNN', description: 'News'},
  {url: 'https://analytics.google.com', title: 'Google Analytics', description: 'Analytics'},
  {
    url: 'https://restcountries.com',
    title: 'REST COUNTRIES',
    description: 'Get information about countries via a RESTful API',
  },
]
export default function Home() {
  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <BookmarkPage links={videoIds} />
    </Layout>
  )
}
