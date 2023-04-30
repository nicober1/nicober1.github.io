import React from 'react'

export default function Svg3() {
  return (
    <svg className='h-12 w-12 animate-spin text-cyan-400' viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm16 0a8 8 0 01-8 8v4a10 10 0 0010-10h-4zm-8 4a4 4 0 100-8 4 4 0 000 8z'
      />
    </svg>
  )
}
