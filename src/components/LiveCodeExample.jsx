import React from 'react'
import ReactDOM from 'react-dom'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'

function LiveCodeExample({code}) {
  return (
    <LiveProvider code={code} scope={{React, ReactDOM}}>
      <div className='grid grid-cols-2 gap-4'>
        <div className='rounded-md p-4'>
          <LiveEditor />
        </div>

        <div className='rounded-md  p-4'>
          <LivePreview />
          <LiveError />
        </div>
      </div>
    </LiveProvider>
  )
}

export default LiveCodeExample
