import React from 'react'
import Layout from '@theme/Layout'


const BookmarkPage = ({links}) => {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='mb-6 text-3xl font-bold'>Bookmarks</h1>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
        {links.map((link, index) => (
          <a key={index} href={link.url} target='_blank' rel='noopener noreferrer' className='rounded-lg bg-blue-200 p-4 shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <div className='mb-2 flex items-center'>
              <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${link.url}`} alt={`${link.title} icon`} className='mr-2 h-7 w-7' />
              <h2 className='text-lg font-medium'>{link.title}</h2>
            </div>
            <p className='text-gray-500'>{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
export default function Home() {
  return (
    <Layout noFooter wrapperClassName='bookmarks-page'>
      <BookmarkPage links={urls} />
    </Layout>
  )
}


const urls = [
  {
    url: 'https://chat.openai.com',
    title: 'ChatGPT',
    description: 'Chatbot using Artificial Intelligence',
  },
  {
    url: 'https://tailwindcss.com',
    title: 'TailWindCSS',
    description:
      'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
  },
  {
    url: 'https://www.youtube.com',
    title: 'YouTube',
    description: 'Video Platform',
  },
  {url: 'https://edition.cnn.com', title: 'CNN', description: 'News'},
  {
    url: 'https://analytics.google.com',
    title: 'Google Analytics',
    description: 'Analytics',
  },
  {
    url: 'https://apod.nasa.gov/',
    title: 'NASA APOD',
    description: 'Astronomy Picture of the Day',
  },
  {
    url: 'https://restcountries.com',
    title: 'REST COUNTRIES',
    description: 'Get information about countries via a RESTful API',
  },
  {
    url: 'https://www.solarsystemscope.com',
    title: 'Solar System Scope',
    description: 'Solar System Scope',
  },
  {
    url: 'https://eyes.nasa.gov',
    title: 'NASA Eyes',
    description: 'Experience Earth and our solar system',
  },
  {
    url: 'https://solarsystem.nasa.gov/',
    title: 'NASA SolarSystem',
    description: 'NASA SolarSystem',
  },
  {
    url: 'https://www.topstockresearch.com/StockDailyTrending/FNOStockDailyClosingLower.html',
    title: 'Indian FO Stocks Closing Lower',
    description: 'Indian FO Stocks Closing Lower',
  },
  {
    url: 'https://www.topstockresearch.com/StockDailyTrending/FNOStockDailyClosingHigher.html',
    title: 'Indian FO Stocks Closing Higher',
    description: 'Indian FO Stocks Closing Higher',
  },
]