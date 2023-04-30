import React from 'react'

export default function Svg8() {
  return (
    <svg viewBox='0 0 100 100'>
      <g transform='translate(50,50)'>
        <path d='M10,-25A35,35 0 1,1 10,25A35,35 0 1,1 10,-25M15,-25A30,30 0 1,0 15,25A30,30 0 1,0 15,-25Z' fill='#000'>
          <animateTransform
            attributeName='transform'
            attributeType='XML'
            type='rotate'
            dur='1s'
            from='0 0 0'
            to='360 0 0'
            repeatCount='indefinite'
          />
        </path>
      </g>
    </svg>
  )
}
