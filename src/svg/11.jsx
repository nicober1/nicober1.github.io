import React from 'react'

export default function Svg11() {
  return (
    <svg width='200' height='200'>
      <circle cx='20' cy='100' r='10' fill='blue'>
        <animate attributeName='cx' values='20; 180; 20' dur='2s' repeatCount='indefinite' />
      </circle>
    </svg>
  )
}
