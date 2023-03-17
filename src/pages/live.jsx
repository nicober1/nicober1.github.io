import React from 'react'
import Layout from '@theme/Layout'

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='livenews-page'>
      <div class='flex-row space-x-5'>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/JEg11Ps8w4M'></iframe>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/5F1Eyf5QN3o'></iframe>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/9Auq9mYxFEE'></iframe>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/0ThMultL4PY'></iframe>
        <iframe width='400' height='400' src='https://www.youtube.com/embed/e9ZnU4HFz0s'></iframe>
      </div>
    </Layout>
  )
}
