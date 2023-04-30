import React from 'react'

export default function Svg4() {
  return (
    <svg viewBox='0 0 100 100'>
      <rect x='25' y='25' width='50' height='50' fill='#000'>
        <animateTransform
          attributeName='transform'
          attributeType='XML'
          type='rotate'
          dur='1s'
          from='0 50 50'
          to='360 50 50'
          repeatCount='indefinite'
        />
      </rect>
    </svg>
  )
}
