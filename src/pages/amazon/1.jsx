import React from 'react'
import Link from '@docusaurus/Link'


const AmazonLayout = () => {
  const affiliateID = 'fluentblogs-21'

  const products = [
    {
      name: 'Kindle',
      image: 'https://m.media-amazon.com/images/I/61yLZMh-6PL._AC_UY218_.jpg',
      url: 'https://www.amazon.com/All-new-Kindle-now-with-a-built-in-front-light/dp/B07DLPWYB7',
    },
    {
      name: 'Echo',
      image: 'https://m.media-amazon.com/images/I/61Gob-M3snL._AC_UY218_.jpg',
      url: 'https://www.amazon.com/All-new-Echo-4th-Gen/dp/B07XKF5RM3',
    },
    {
      name: 'Fire Stick',
      image: 'https://m.media-amazon.com/images/I/51Da2Z+FTFL._AC_UY218_.jpg',
      url: 'https://www.amazon.com/Fire-TV-Stick-with-Alexa-Voice-Remote/dp/B0791TX5P5',
    },
  ]

  return (
    <div className='mx-auto max-w-4xl font-sans'>
      <h1 className='py-8 text-center text-4xl font-bold'>Amazon Products</h1>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {products.map((product) => (
          <a
            key={product.name}
            href={`${product.url}?tag=${affiliateID}`}
            className='block rounded border p-4 hover:bg-gray-100'>
            <img src={product.image} alt={product.name} className='h-auto w-full object-contain' />
            <h2 className='py-2 text-center text-xl font-medium'>{product.name}</h2>
          </a>
        ))}
      </div>
    </div>
  )
}

export default AmazonLayout
