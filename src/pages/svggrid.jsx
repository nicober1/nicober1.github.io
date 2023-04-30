import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'

export default function SvgGrid() {
  const [svgs, setSvgs] = useState([])

  useEffect(() => {
    const importSvgs = async () => {
      try {
        const svgModules = await Promise.all(
          Array.from({length: 14}, (_, i) => import(`@site/src/svg/${i + 1}`).then((module) => module.default)),
        )
        setSvgs(svgModules)
      } catch (error) {
        console.error(error)
      }
    }
    importSvgs()
  }, [])

  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='container flex flex-wrap bg-white'>
        {svgs.map((Svg, index) => (
          <div
            key={index}
            className='flex w-full transform items-center justify-center p-4 transition duration-300 hover:scale-110 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'
          >
            <Svg />
          </div>
        ))}
      </div>
    </Layout>
  )
}
