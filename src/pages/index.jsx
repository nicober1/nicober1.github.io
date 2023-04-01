import React, {useState, useEffect} from 'react'
import Link from '@docusaurus/Link'
import classNames from 'classnames'
import Layout from '@theme/Layout'
import DonateButton from '@site/src/components/DonateButton'

function PageLink({to, title, description}) {
  return (
    <Link to={to}>
      <div className='flex transform flex-col items-center justify-center rounded  bg-cyan-500 bg-opacity-40 p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105'>
        <p
          className={classNames(
            'mb-2 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text  font-bold text-transparent transition duration-300 ease-in-out hover:from-blue-400 hover:to-purple-500',
          )}>
          {title}
        </p>
        <p className='text-center  text-white'>{description}</p>
      </div>
    </Link>
  )
}

function useBackgroundImage() {
  const [backgroundImage, setBackgroundImage] = useState('url(https://source.unsplash.com/random/1920x1080?galaxy)')
  const images = [
    'url(https://source.unsplash.com/random/1920x1080?moon)',
    'url(https://source.unsplash.com/random/1920x1080?star)',
    'url(https://source.unsplash.com/random/1920x1080?universe)',
    'url(https://source.unsplash.com/random/1920x1080?mars)',
    'url(https://source.unsplash.com/random/1920x1080?avengers)',
    'url(https://source.unsplash.com/random/1920x1080?saturn)',
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length)
      setBackgroundImage(images[randomIndex])
    }, 7000)
    return () => clearInterval(interval)
  }, [])
  return backgroundImage
}

export default function HomePage() {
  const backgroundImage = useBackgroundImage()
  const [colorIndex, setColorIndex] = useState(0)
  const colors = ['bg-gradient-to-r from-red-600 via-yellow-400 to-green-600']

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout noFooter>
      <div className='mx-auto my-auto  bg-cover bg-no-repeat' style={{backgroundImage}}>
        <DonateButton />
        <div className='container mx-auto my-auto'>
          <div className='container mx-auto my-auto text-center font-bold text-transparent '>
            <h2
              className={classNames(
                'mt-10 bg-clip-text  text-xl   sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
                colors[colorIndex],
              )}>
              Welcome to Fluent Blogs
            </h2>
            <h2
              className={classNames(
                'mt-4 bg-clip-text text-sm  sm:text-base md:text-lg lg:text-xl xl:text-2xl',
                colors[colorIndex],
              )}>
              Words that flow, Ideas that grow
            </h2>
          </div>

          <div className='container mx-auto my-auto mb-6 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-3'>
            <PageLink
              to='/youtube/1'
              title='Most viewed videos in Youtube'
              description='Most viewed videos in Youtube'
            />
            <PageLink
              to='/radio'
              title='Listen to World Radio'
              description='Collection of top Radio Stations around the World'
            />
            <PageLink to='/tw' title='Twitter - Important Timelines' description='Stay updated with Tweets' />
            <PageLink
              to='/youtube/2'
              title='Curated Best YouTube Playlists'
              description='Enjoy Best Youtube PlayList Collection'
            />
            <PageLink to='/spotify' title='Curated Spotify Playlists' description='Enjoy Spotify PlayList Collection' />
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
            <PageLink
              to='/stock'
              title='India Stocks - Buy/Sell Technical Analysis - TradingView'
              description='India Stocks - Buy/Sell Technical Analysis - TradingView'
            />

            <PageLink to='/live' title='Live News Channels' description='Live News Channels' />
            <PageLink to='/gallery' title='Random Picture Gallery' description='Random Picture Gallery' />
            <PageLink to='/timezones' title='Timezones' description='Timezones of the World' />
            <PageLink to='/countries' title='Countries' description='Countries of the World' />
            <PageLink to='/blog' title='Blogs' description='Blogs' />

            <PageLink to='/matrix' title='Matrix Effect' description='Matrix Effect' />
            <PageLink to='/particlesseaanemone' title='Sea Anemone Graphics' description='Sea Anemone Graphics' />
            <PageLink to='/reactlive' title='React Live Editor' description='Live code editor for React' />
            <PageLink to='/bookmarks' title='Important Site Bookmarks' description='Important Bookmarks' />
            <PageLink to='/colors' title='Colors' description='List of Colors' />
            <PageLink to='/hexcolors' title='Colors with Hex Code' description='List of Colors with Hex Code' />
            <PageLink to='/cryptoprices' title='CrytoCurrency List' description='List of CrytoCurrency' />
            <PageLink to='/nobel' title='Nobel Laureates' description='List of Nobel Laureates' />
            <PageLink to='/periodictable' title='Periodic Table of Elements' description='Periodic Table of Elements' />
            <PageLink to='/primenumbers' title='Prime Numbers' description='Prime Numbers' />
            <PageLink to='/word' title='Synonym/Antonym/Usage of Word' description='Synonym/Antonym/Usage of Word' />
            <PageLink to='/tailwind' title='Tailwind CSS Cheatsheet' description='Tailwind CSS Cheatsheet' />
            <PageLink to='/unsplash' title='Unsplash Photos' description='Unsplash Photos' />
            <PageLink
              to='/catdoggallery'
              title='Gallery for Cat and Dog Pics'
              description='Gallery for Cat and Dog Pics'
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
