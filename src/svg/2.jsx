import React from 'react'

export default function Svg2() {
  return (
    <svg viewBox='0 0 100 100'>
      <circle cx='50' cy='50' r='30' fill='#ff9900'>
        <animate
          attributeName='cy'
          from='50'
          to='80'
          dur='1s'
          repeatCount='indefinite'
          calcMode='spline'
          keySplines='0.4 0 0.2 1; 0.4 0 0.2 1'
        />
        <animate attributeName='opacity' from='1' to='0' dur='1s' repeatCount='indefinite' begin='0s' />
      </circle>
    </svg>
  )
}
