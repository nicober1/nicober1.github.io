import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import ImageModal from 'react-modal-image'
import Layout from '@theme/Layout'

function Art() {
  const images = []
  for (let i = 1; i <= 200; i++) {
    images.push(`${i}.jpg`)
    images.push(`${i}.JPG`)
    images.push(`${i}.PNG`)
  }

  const imageElements = images.map((image) => {
    const loc = `/img/gallery/space/${image}`
    try {
      require(`/img/gallery/space/${image}`)
      return (
        <ImageModal
          className='hover:scale-150'
          small={useBaseUrl(`${loc}`)}
          large={useBaseUrl(`${loc}`)}
          showRotate={true}
        />
      )
    } catch (error) {
      //throw error
    }
  })

  return (
    <Layout noFooter>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{imageElements}</div>
    </Layout>
  )
}

export default Art
