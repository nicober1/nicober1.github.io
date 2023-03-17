import React from 'react'
import Layout from '@theme/Layout'
import BookmarkPage from '@site/src/components/BookmarkPage'

const videoIds = [
  {url: 'https://chat.openai.com', title: 'ChatGPT', description: 'Chatbot using Artificial Intelligence'},
  {url: 'https://chat.openai.com', title: 'ChatGPT', description: 'Artificial Intelligence'},
  {url: 'https://chat.openai.com', title: 'ChatGPT', description: 'Artificial Intelligence'},
  {url: 'https://chat.openai.com', title: 'ChatGPT', description: 'Artificial Intelligence'},
]
export default function Home() {
  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <BookmarkPage links={videoIds} />
    </Layout>
  )
}
