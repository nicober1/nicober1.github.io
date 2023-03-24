import React from 'react'

export default function Svg9() {
  return (
    <svg width='200' height='100'>
      <rect x='0' y='50' width='80' height='40' fill='blue'>
        <animate
          attributeName='x'
          from='-80'
          to='220'
          dur='2s'
          repeatCount='indefinite'
        />
      </rect>
      <rect x='80' y='70' width='20' height='20' fill='red'>
        <animate
          attributeName='x'
          from='-80'
          to='220'
          dur='2s'
          repeatCount='indefinite'
        />
      </rect>
    </svg>
  )
}



