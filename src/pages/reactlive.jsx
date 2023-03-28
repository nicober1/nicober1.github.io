import CodeBlock from '@theme/CodeBlock'
import React from 'react'
import Layout from '@theme/Layout'

export default function ReactLive() {
  return (
    <Layout>
      <CodeBlock live css={true} language='jsx' title='/src/components/HelloCodeTitle.js' showLineNumbers>
        {`
      function Button() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>
  );
}
`}
      </CodeBlock>
    </Layout>
  )
}
