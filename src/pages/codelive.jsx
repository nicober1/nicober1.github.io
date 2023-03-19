import React from 'react'
import Layout from '@theme/Layout'
import LiveCodeExample from '@site/src/components/LiveCodeExample'

export default function Home() {
  const jsxExample = `
class Counter extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({ count: state.count + 1 }))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <center>
        <h3>
          {this.state.count}
        </h3>
      </center>
    )
  }
}
`.trim()

  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <div className='container mx-auto py-8'>
        <h1 className='mb-4 text-center text-4xl font-bold'>React Live Editor</h1>

        <div>
          <LiveCodeExample code={jsxExample} />
        </div>
      </div>
    </Layout>
  )
}
