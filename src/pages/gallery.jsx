import React from 'react'
import Layout from '@theme/Layout'
import {faker} from '@faker-js/faker'

export default function GalleryPage() {
  const images = Array.from({length: 1000}, () => ({
    thumbnailUrl: faker.image.image(null, null, true),
  }))

  return (
    <Layout noFooter wrapperClassName='fluent'>
      <div className='mx-auto px-4 py-8 text-center sm:px-6 lg:px-8'>
        <h1 className='mb-8 text-3xl font-bold'>Random Picture Gallery</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {images.map(({thumbnailUrl}, index) => (
            <div key={index} className='thumbnail-wrapper'>
              <img src={thumbnailUrl} className='h-full w-full rounded-lg object-cover shadow-md' alt='Thumbnail' />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
