import React from 'react'
import Layout from '@theme/Layout'
import Svg1 from '@site/src/svg/1'
import Svg2 from '@site/src/svg/2'
import Svg3 from '@site/src/svg/3'

const svgs = [Svg1, Svg2, Svg3]

export default function Home() {
  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='flex flex-wrap'>
        {svgs.map((Svg, index) => (
          <div key={index} className='basis-1/6 border-solid  dark:border-white'>
            <Svg />
          </div>
        ))}
      </div>
    </Layout>
  )
}
