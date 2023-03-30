import React, {useState, useEffect} from 'react'
import Link from '@docusaurus/Link'
import classNames from 'classnames'
import Layout from '@theme/Layout'

function PageLink({to, title, description}) {
  return (
    <div className='flex transform flex-col items-center justify-center rounded  bg-cyan-500 bg-opacity-40 p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105'>
      <Link
        to={to}
        className={classNames(
          'mb-2 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text  font-bold text-transparent transition duration-300 ease-in-out hover:from-blue-400 hover:to-purple-500',
        )}>
        {title}
      </Link>
      <p className='text-center  text-white'>{description}</p>
    </div>
  )
}

function useBackgroundImage() {
  const [backgroundImage, setBackgroundImage] = useState('url(https://source.unsplash.com/random/1920x1080?water)')
  const images = [
    'url(https://source.unsplash.com/random/1920x1080?girl)',
    'url(https://source.unsplash.com/random/1920x1080?space)',
    'url(https://source.unsplash.com/random/1920x1080?rocket)',
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length)
      setBackgroundImage(images[randomIndex])
    }, 15000)
    return () => clearInterval(interval)
  }, [])
  return backgroundImage
}

export default function HomePage() {
  const backgroundImage = useBackgroundImage()
  const [colorIndex, setColorIndex] = useState(0)
  const colors = [
    'bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 ',
    'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 ',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout noFooter>
      <div
        className={classNames(
          'flex h-screen flex-col items-center justify-center',
          'bg-cover bg-center bg-no-repeat',
          'md:bg-cover md:bg-fixed md:bg-center',
        )}
        style={{backgroundImage}}>
        <main className='container mx-auto p-4'>
          <h2
            className={classNames(
              'mb-8 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
              colors[colorIndex],
            )}>
            Welcome to Fluent Blogs
          </h2>
          <h2
            className={classNames(
              'mb-8 bg-clip-text text-sm font-bold text-transparent sm:text-base md:text-lg lg:text-xl xl:text-2xl',
              colors[colorIndex],
            )}>
            Words that flow, Ideas that grow
          </h2>
          <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3'>
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
            <PageLink
              to='/hero'
              title='Superheros and Superheroines'
              description='Details of Superheros and Superheroines'
            />
            <PageLink to='/gallery' title='Random Picture Gallery' description='Random Picture Gallery' />
            <PageLink to='/timezones' title='Timezones' description='Timezones of the World' />
            <PageLink to='/countries' title='Countries' description='Countries of the World' />
            <PageLink to='/blog' title='Blogs' description='Blogs' />
            <PageLink to='/live' title='Live News Channels' description='Live News Channels' />
            <PageLink
              to='/apod'
              title='NASA Astronomy Picture of the Day'
              description='NASA Astronomy Picture of the Day'
            />
            <PageLink to='/matrix' title='Matrix Effect' description='Matrix Effect' />
            <PageLink to='/particlesseaanemone' title='Sea Anemone Graphics' description='Sea Anemone Graphics' />
            <PageLink to='/reactlive' title='React Live Editor' description='Live code editor for React' />
          </div>
        </main>
      </div>
    </Layout>
  )
}
