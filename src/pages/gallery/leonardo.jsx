import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import ImageModal from 'react-modal-image'
import Layout from '@theme/Layout'

const loc = '/img/gallery/leonardo/'
function Gallery() {
  const images = []
  for (let i = 1; i <= 210; i++) {
    images.push(`${i}.jpg`)
  }

  const imageElements = images.map((image) => {
    try {
      return (
        <ImageModal
          className='hover:scale-150'
          src={useBaseUrl(`${loc}${image}`)}
          //   alt={image}
          small={useBaseUrl(`${loc}${image}`)}
          large={useBaseUrl(`${loc}${image}`)}
          showRotate={true}
        />
      )
    } catch (error) {}
  })

  return (
    <Layout noFooter>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{imageElements}</div>
    </Layout>
  )
}

export default Gallery
