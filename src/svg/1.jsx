import React from 'react'

export default function Svg1() {
  return (
    <svg width='800' height='600' viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <circle id='orbit' cx='400' cy='300' r='200' fill='none' stroke='#fff' strokeDasharray='5 5' />
      </defs>
      <rect x='0' y='0' width='800' height='600' fill='#000' />
      <image x='350' y='250' width='100' height='100' href='https://source.unsplash.com/random/1920x1080?sun' />
      <use xlinkHref='#orbit' />
      <image x='-50' y='-50' width='100' height='100' href='https://source.unsplash.com/random/1920x1080?earth'>
        <animateTransform attributeName='transform' type='rotate' from='-90 400 300' to='-450 400 300' dur='10s' repeatCount='indefinite' />
      </image>
      <use xlinkHref='#orbit' />
      <image x='-50' y='-50' width='100' height='100' href='https://source.unsplash.com/random/1920x1080?mars'>
        <animateTransform attributeName='transform' type='rotate' from='-90 400 300' to='-450 400 300' dur='15s' repeatCount='indefinite' />
      </image>
    </svg>
  )
}



