import React from 'react'
import ReactDOM from 'react-dom'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'

function LiveCodeExample({code}) {
  const containerId = 'live-preview-container'

  function renderPreview() {
    const codeToRender = `
      ReactDOM.render(
        <React.StrictMode>
          ${code}
        </React.StrictMode>,
        document.getElementById("${containerId}")
      );
    `
    eval(codeToRender)
  }

  return (
    <LiveProvider code={code} scope={{React, ReactDOM}}>
      <div className='grid grid-cols-2 gap-4'>
        <div className='rounded-md p-4'>
          <LiveEditor />
        </div>

        <div className='rounded-md  p-4'>
          <div id={containerId} onLoad={renderPreview}></div>
          <LiveError />
        </div>
      </div>
    </LiveProvider>
  )
}

export default LiveCodeExample
