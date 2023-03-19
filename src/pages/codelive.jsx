import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '@theme/Layout'
import LiveCodeExample from '@site/src/components/LiveCodeExample'


export default function Home() {
  const code = `
    const HelloWorld = () => {
      return <h1 className="text-3xl font-bold">Hello, World!</h1>;
    }

    ReactDOM.render(<HelloWorld />, document.getElementById("live-preview-container"))
  `
  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-4 text-4xl font-bold'>React Live Editor</h1>

        <div>
          <h1>My Page</h1>
          <LiveCodeExample code={code} />
        </div>
      </div>
    </Layout>
  )
}
