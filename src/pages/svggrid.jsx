import React from 'react'
import Layout from '@theme/Layout'
import Svg1 from '@site/src/svg/1'
import Svg2 from '@site/src/svg/2'
import Svg3 from '@site/src/svg/3'
import Svg4 from '@site/src/svg/4'
import Svg5 from '@site/src/svg/5'
import Svg6 from '@site/src/svg/6'
import Svg7 from '@site/src/svg/7'
import Svg8 from '@site/src/svg/8'
import Svg9 from '@site/src/svg/9'
import Svg10 from '@site/src/svg/10'


const svgs = [
  Svg1,
  Svg2,
  Svg3,
  Svg4,
  Svg5,
  Svg6,
  Svg7,
  Svg8,
  Svg9,
  Svg10,
 
]

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='flex flex-wrap'>
        {svgs.map((Svg, index) => (
          <div
            key={index}
            className='basis-1/6 border-solid  dark:border-white'>
            <Svg />
          </div>
        ))}
      </div>
    </Layout>
  )
}
