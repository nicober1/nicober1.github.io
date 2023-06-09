import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import ImageModal from 'react-modal-image'
import Layout from '@theme/Layout'

function Art() {
  const images = []
  images.push(`cnn.png`)
  images.push(`bbc.png`)
  images.push(`cnbc.png`)

  const imageElements = images.map((image) => {
    const loc = `/scr/${image}`
    try {
      require(`/scr/${image}`)
      return (
        <ImageModal
          className='hover:scale-105'
          small={useBaseUrl(`${loc}`)}
          large={useBaseUrl(`${loc}`)}
          showRotate={true}
        />
      )
    } catch (error) {}
  })

  return (
    <Layout noFooter>
      <div className='container mx-auto my-auto'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{imageElements}</div>
      </div>
    </Layout>
  )
}

export default Art
