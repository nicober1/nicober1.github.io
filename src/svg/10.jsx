import React from 'react'

export default function Svg10() {
  return (
    <svg width='100' height='100'>
      <path d='M50,20 C40,10 20,10 20,30 C20,50 50,70 50,70 C50,70 80,50 80,30 C80,10 60,10 50,20 Z' fill='red'>
        <animate attributeName='fill-opacity' values='1;0.5;1' dur='1s' repeatCount='indefinite' />
        <animate
          attributeName='d'
          values='M50,20 C40,10 20,10 20,30 C20,50 50,70 50,70 C50,70 80,50 80,30 C80,10 60,10 50,20 Z;M50,20 C40,10 20,10 20,30 C20,50 50,90 50,90 C50,90 80,50 80,30 C80,10 60,10 50,20 Z;M50,20 C40,10 20,10 20,30 C20,50 50,70 50,70 C50,70 80,50 80,30 C80,10 60,10 50,20 Z'
          dur='1s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  )
}
