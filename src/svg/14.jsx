import React from 'react'

export default function Svg3() {
  return (
    <svg className='h-12 w-12 animate-spin' viewBox='0 0 24 24'>
      <defs>
        <linearGradient id='grad1' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' style={{stopColor: 'rgb(255,255,255)', stopOpacity: 1}} />
          <stop offset='100%' style={{stopColor: 'rgb(0,128,128)', stopOpacity: 1}} />
        </linearGradient>
        <radialGradient id='grad2' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>
          <stop offset='0%' style={{stopColor: 'rgb(255,255,255)', stopOpacity: 0}} />
          <stop offset='100%' style={{stopColor: 'rgb(255,255,255)', stopOpacity: 1}} />
        </radialGradient>
      </defs>
      <rect x='0' y='0' width='800' height='600' fill='url(#grad1)' />
      <circle cx='400' cy='300' r='200' fill='url(#grad2)' />
      <ellipse cx='400' cy='300' rx='150' ry='100' fill='#fff0f5' opacity='0.8' />
      <polygon points='400,100 500,300 300,300' fill='#f0fff0' opacity='0.8' />
    </svg>
  )
}



