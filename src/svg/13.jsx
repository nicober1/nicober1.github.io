import React from 'react'

export default function Svg3() {
  return (
    <svg className='h-12 w-12 animate-spin' viewBox='0 0 24 24'>
      <defs>
        <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style={{stopColor: 'rgb(16,185,129)', stopOpacity: 1}} />
          <stop offset='100%' style={{stopColor: 'rgb(5,150,105)', stopOpacity: 1}} />
        </linearGradient>
        <linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style={{stopColor: 'rgb(4,120,87)', stopOpacity: 1}} />
          <stop offset='100%' style={{stopColor: 'rgb(6,95,70)', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <circle className='opacity-50' cx='12' cy='12' r='10' stroke='url(#grad1)' strokeWidth='4' fill='none' />
      <path className='opacity-75' fill='url(#grad2)' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm16 0a8 8 0 01-8 8v4a10 10 0 0010-10h-4zm-8 4a4 4 0 100-8 4 4 0 000 8z' />
    </svg>
  )
}



