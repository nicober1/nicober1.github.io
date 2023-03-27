import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'

const Home = () => {
  const [svgs, setSvgs] = useState([])

  useEffect(() => {
    const importSvgs = async () => {
      try {
        const svgModules = await Promise.all(
          Array.from({length: 12}, (_, i) =>
            import(`@site/src/svg/${i + 1}`).then((module) => module.default),
          ),
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
      <div className='flex flex-wrap container bg-white'>
        {svgs.map((Svg, index) => (
          <div
            key={index}
            className='basis-1/6 items-center justify-center'>
            <Svg />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Home
