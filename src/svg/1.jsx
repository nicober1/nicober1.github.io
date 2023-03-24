import React from 'react'

export default function Svg1() {
  return (
    <svg width='200' height='200'>
      <rect x='0' y='0' width='200' height='200' fill='#000000' />
      <circle cx='100' cy='100' r='50' fill='#ffffff'>
        <animate
          attributeName='r'
          from='50'
          to='70'
          dur='1s'
          repeatCount='indefinite'
        />
        <animate
          attributeName='fill-opacity'
          from='0'
          to='1'
          dur='1s'
          repeatCount='indefinite'
        />
      </circle>
      <text
        x='100'
        y='120'
        font-size='24'
        font-family='Helvetica'
        fill='#ffffff'
        text-anchor='middle'>
        Animating SVG
      </text>
    </svg>
  )
}



