import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'
import {faker} from '@faker-js/faker'

export default function () {
  const [colors, setColors] = useState([])

  useEffect(() => {
    const numColors = 200

    const listColors = Array.from({length: numColors}, () =>
      faker.color.human(),
    )

    setColors(listColors)
  }, [])

  return (
    <Layout noFooter wrapperClassName='countries-page'>
      <div className='container mx-auto'>
        <h1 className='dark:text-shadow-lg mx-auto mt-10 text-center text-4xl font-bold text-black dark:text-white'>
          Random Colors
        </h1>
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {colors.map((color) => {
            return (
              <div
                key={color}
                className='overflow-hidden rounded-full text-center'
                style={{backgroundColor: color, padding: '10px'}}>
                <div className='p-4'>
                  <h3 className='mx-auto my-auto text-sm font-semibold uppercase text-gray-600'>
                    {color}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
