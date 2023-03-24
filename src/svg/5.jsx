import React from 'react'

export default function Svg5() {
  return (
    <svg viewBox='0 0 100 100'>
      <circle cx='50' cy='50' r='30' fill='#000'>
        <animate
          attributeName='cy'
          values='50;80;50'
          dur='1s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  )
}



