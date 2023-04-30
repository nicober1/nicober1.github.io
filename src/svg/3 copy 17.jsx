import React from 'react'

export default function Svg3() {
  return (
    <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='50' cy='50' r='40' stroke='blue' stroke-width='2' fill='none'>
        <animate attributeName='stroke-dasharray' values='0 251.2;251.2 0' dur='1s' repeatCount='indefinite' />
        <animate attributeName='stroke-dashoffset' values='0;-251.2' dur='1s' repeatCount='indefinite' />
      </circle>
    </svg>
  )
}
