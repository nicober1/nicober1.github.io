import React, {useState, useEffect, useMemo} from 'react'
import Link from '@docusaurus/Link'
import classNames from 'classnames'
import Layout from '@theme/Layout'
import DonateButton from '@site/src/components/DonateButton'
import TickerTape from '@site/src/components/tickertape'
import useBaseUrl from '@docusaurus/useBaseUrl'
import BusinessTicker from '@site/src/pages/news/BusinessTicker'
import CardGradientsDark from '@site/src/components/CardGradientsDark'

function PageLink({to, title, description}) {
  return (
    <Link to={to}>
      <div className='card flex transform flex-col items-center justify-center rounded p-4 shadow-lg transition duration-300 ease-in-out hover:scale-125'>
        <p
          className={classNames(
            'mb-2 bg-gradient-to-r from-yellow-200 to-red-200 bg-clip-text  text-xl font-bold text-transparent transition duration-300 ease-in-out hover:from-blue-200 hover:to-purple-500',
          )}
        >
          {title}
        </p>
        <p className='text-center text-black dark:text-white'>{description}</p>
      </div>
    </Link>
  )
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function HomePage() {
  const baseUrl = useBaseUrl(`/img/earth/`)
  const [backgroundImage, setBackgroundImage] = useState(`url(${baseUrl}${getRandomNumber(2, 5)}.jpg)`)
  const [colorIndex, setColorIndex] = useState(0)
  const colors = ['bg-gradient-to-r from-red-600 via-yellow-400 to-green-600']

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
      const randomIndex = getRandomNumber(1, 17)
      setBackgroundImage(`url(${baseUrl}${randomIndex}.jpg)`)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout noFooter>
      {/* <div className='mx-auto my-auto bg-cover bg-center bg-no-repeat' style={{backgroundImage}}> */}
      <div className='mx-auto my-auto '>
        <DonateButton />

        <div className='container mx-auto my-auto text-center font-bold text-transparent '>
          <h2
            className={classNames(
              'mt-10 bg-clip-text  text-xl  sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
              colors[colorIndex],
            )}
          >
            Welcome to Fluent Blogs
          </h2>
          <h2
            className={classNames(
              'mt-4 bg-clip-text text-sm  sm:text-base md:text-lg lg:text-xl xl:text-2xl',
              colors[colorIndex],
            )}
          >
            Words that flow, Ideas that grow
          </h2>
        </div>
        <div className='mt-10'>
          <TickerTape />
        </div>

        <div className='mt-10'>
          <BusinessTicker />
        </div>

        <div className='container mx-auto my-auto'>
          <CardGradientsDark>
            <div className='container mx-auto my-auto mb-6 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-3'>
              <PageLink
                to='/radio'
                title='Listen to World Radio'
                description='Collection of top Radio Stations around the World'
              />
              <PageLink to='/stock/crypto' title='Cryptocurrency' description='Displays Crypto Assets' />
              <PageLink
                to='/youtube/1'
                title='Most viewed videos in Youtube'
                description='Most viewed videos in Youtube'
              />

              <PageLink to='/tw' title='Twitter - Important Timelines' description='Stay updated with Tweets' />
              <PageLink
                to='/youtube/2'
                title='Curated Best YouTube Playlists'
                description='Enjoy Best Youtube PlayList Collection'
              />
              <PageLink
                to='/nasaeyesss'
                title='Eyes on the Solar System'
                description='Courtsey @ NASA @ https://eyes.nasa.gov/'
              />
              <PageLink
                to='/nasaeyesearth'
                title='Eyes on Earth'
                description='Courtsey @ NASA @ https://eyes.nasa.gov/'
              />
              <PageLink
                to='/nasaeyesinter'
                title='Interactive Solar System'
                description='Courtsey @ NASA @ https://eyes.nasa.gov/'
              />

              <PageLink
                to='/solarmodel'
                title='Solar System Scope 3D Model'
                description='Courtesy @ INOVE @ https://www.solarsystemscope.com'
              />
              <PageLink to='/3dplanets' title='3D Model of Planets and Moons' description='Courtesy @ NASA' />

              <PageLink
                to='/nasaeyesasteroids'
                title='Eyes on the Asteriods'
                description='Courtsey @ NASA @ https://eyes.nasa.gov/'
              />
              <PageLink
                to='/nasaeyesexo'
                title='Eyes on the ExoPlanets'
                description='Courtsey @ NASA @ https://eyes.nasa.gov/'
              />
              <PageLink
                to='/apod'
                title='NASA Astronomy Picture of the Day'
                description='NASA Astronomy Picture of the Day'
              />
              <PageLink to='/weather' title='World Weather' description='Checkout World Weather' />
              <PageLink
                to='/hero'
                title='Superheros and Superheroines'
                description='Details of Superheros and Superheroines'
              />
              <PageLink to='/stock/widget' title='Stock Market Widgets' description='Stock Market Widgets' />
              <PageLink
                to='/stock/indiaanalysis'
                title='Buy/Sell Technical Analysis'
                description='India Stocks powered by TradingView'
              />

              <PageLink to='/live/news' title='Live News Channels' description='Live News Channels' />
              <PageLink to='/gallery' title='Random Picture Gallery' description='Random Picture Gallery' />
              <PageLink to='/timezones' title='Timezones' description='Timezones of the World' />
              <PageLink to='/countries' title='Countries' description='Countries of the World' />
              <PageLink to='/blog' title='Blogs' description='Blogs' />

              <PageLink to='/matrix' title='Matrix Effect' description='Matrix Effect' />
              <PageLink to='/particlesseaanemone' title='Sea Anemone Graphics' description='Sea Anemone Graphics' />
              <PageLink to='/reactlive' title='React Live Editor' description='Live code editor for React' />
              <PageLink to='/bookmarks' title='Important Site Bookmarks' description='Important Bookmarks' />
              <PageLink to='/colors' title='Colors' description='List of Colors' />
              <PageLink to='/emoji' title='Emojis' description='Explore Emojis' />
              <PageLink to='/hexcolors' title='Colors with Hex Code' description='List of Colors with Hex Code' />
              <PageLink to='/cryptoprices' title='CrytoCurrency List' description='List of CrytoCurrency' />
              <PageLink to='/nobel' title='Nobel Laureates' description='List of Nobel Laureates' />
              <PageLink
                to='/periodictable'
                title='Periodic Table of Elements'
                description='Periodic Table of Elements'
              />
              <PageLink to='/primenumbers' title='Prime Numbers' description='Prime Numbers' />
              <PageLink to='/word' title='Synonym/Antonym/Usage of Word' description='Synonym/Antonym/Usage of Word' />
              <PageLink to='/tailwind' title='Tailwind CSS Cheatsheet' description='Tailwind CSS Cheatsheet' />
              <PageLink to='/unsplash' title='Unsplash Photos' description='Unsplash Photos' />
              <PageLink
                to='/catdoggallery'
                title='Gallery for Cat and Dog Pics'
                description='Gallery for Cat and Dog Pics'
              />
              <PageLink
                to='/spotify'
                title='Curated Spotify Playlists'
                description='Enjoy Spotify PlayList Collection'
              />
              <PageLink to='/movies/1' title='Top Movies' description='Top 250 Movies (IMDB)' />
            </div>
          </CardGradientsDark>
        </div>
      </div>
    </Layout>
  )
}
