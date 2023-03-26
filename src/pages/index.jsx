import React, {useState, useEffect} from 'react'
import Link from '@docusaurus/Link'
import classNames from 'classnames'
import Layout from '@theme/Layout'

function PageLink({to, title, description}) {
  return (
    <div className='flex transform flex-col items-center justify-center rounded  bg-gray-800 p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105'>
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
  const [backgroundImage, setBackgroundImage] = useState('url(https://source.unsplash.com/random/1920x1080?nature)')
  const images = ['url(https://source.unsplash.com/random/1920x1080?nature)', 'url(https://source.unsplash.com/random/1920x1080?city)', 'url(https://source.unsplash.com/random/1920x1080?space)']
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length)
      setBackgroundImage(images[randomIndex])
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return backgroundImage
}

export default function HomePage() {
  const backgroundImage = useBackgroundImage()
  const [colorIndex, setColorIndex] = useState(0)
  const colors = ['bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 ', 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 ']

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout noFooter>
      <div className={classNames('flex h-screen flex-col items-center justify-center', 'bg-cover bg-center bg-no-repeat', 'md:bg-cover md:bg-fixed md:bg-center')} style={{backgroundImage}}>
        <h2 className={classNames('mb-8 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl', colors[colorIndex])}>Welcome to Fluent Blogs</h2>
        <h2 className={classNames('mb-8 bg-clip-text text-sm font-bold text-transparent sm:text-base md:text-lg lg:text-xl xl:text-2xl', colors[colorIndex])}>
          Words that flow, Ideas that grow
        </h2>
        <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <PageLink to='/radio' title='Listen to Radio' description='Radio streams from around the world' />
          <PageLink to='/page2' title='Page 2' description='Description of Page 2' />
          <PageLink to='/page3' title='Page 3' description='Description of Page 3' />
        </div>
      </div>
    </Layout>
  )
}
