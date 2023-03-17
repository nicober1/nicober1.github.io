import React from 'react'
import Layout from '@theme/Layout'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <div class='flex-row space-x-5'>
        <a target='_blank' href='https://chat.openai.com/'>
          ChatGPT
        </a>
      </div>
    </Layout>
  )
}
