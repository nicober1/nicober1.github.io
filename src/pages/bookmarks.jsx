import React from 'react'
import Layout from '@theme/Layout'
import BookmarkPage from '@site/src/components/BookmarkPage'

// const videoIds = ['https://chat.openai.com/', 'https://chat.openai.com/']
const videoIds = ['https://chat.openai.com/', 'https://chat.openai.com/']
export default function Home() {
  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <BookmarkPage links={videoIds} />
    </Layout>
  )
}
