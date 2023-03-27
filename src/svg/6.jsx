import React from 'react'

export default function Svg6() {
  return (
    <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
      <text x='50' y='50' fill='#000' font-size='24' opacity='0'>
        Hello world
        <animate attributeName='opacity' values='0;1;0' dur='1s' repeatCount='indefinite' />
      </text>
    </svg>
  )
}



