import React from 'react'

export default function Svg7() {
  return (
    <svg viewBox='0 0 100 100'>
      <circle cx='50' cy='50' r='0' fill='#000'>
        <animate attributeName='r' values='0;50' dur='1s' repeatCount='indefinite' />
      </circle>
    </svg>
  )
}
