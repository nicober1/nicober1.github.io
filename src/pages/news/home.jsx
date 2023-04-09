import {FaUser, FaCalendar} from 'react-icons/fa'
import Loading from '@site/src/pages/1Loading'
import CardGradientsDark from '@site/src/components/CardGradientsDark'

import {useState, useEffect} from 'react'
import businessd from '/data/news/business.json'
import entertainmentd from '/data/news/entertainment.json'
import generald from '/data/news/general.json'
import healthd from '/data/news/health.json'
import scienced from '/data/news/science.json'
import sportsd from '/data/news/sports.json'
import technologyd from '/data/news/technology.json'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'



const News = () => {
  const categories = [
    {name: 'Business', data: businessd.articles},
    {name: 'Entertainment', data: entertainmentd.articles},
    {name: 'Science', data: scienced.articles},
    {name: 'Sports', data: sportsd.articles},
    {name: 'Technology', data: technologyd.articles},
    {name: 'General', data: generald.articles},
    {name: 'Health', data: healthd.articles},
  ]

  const locale = 'en-US'
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  const settings = {
    centerMode: true,
    dots: false,
    infinite: true,
    centerPadding: '60px',
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

   


  return (
    <Loading time='0'>
      <div className='news container mx-auto my-10'>
        <h1 className='animate-fade-in rounded-lg bg-gradient-to-l from-green-300 to-blue-400 p-4 text-center text-4xl font-bold text-white shadow-2xl'>
          News
        </h1>
        {categories.map((category, index) => (
          <div key={index} className='category'>
            <h2 className='text-2xl font-bold'>{category.name}</h2>
            <Slider {...settings}>
              {category.data.map((article, index) => (
                <CardGradientsDark>
                  <div
                    key={index}
                    className='card flex transform flex-col  rounded-lg  p-4 shadow-lg transition-transform duration-300 hover:scale-105'>
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className='transition-brightness h-35 w-full rounded-lg object-cover brightness-100 filter duration-300 hover:brightness-75'
                    />
                    <div className='flex flex-grow flex-col'>
                      <h3 className='mt-2 text-xl font-semibold text-white'>
                        <span className='text-shadow-lg' style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                          {article.title.split('-')[0]}
                        </span>
                      </h3>
                      <p className='mt-2 text-base text-white'>{article.description}</p>
                      <div className='mt-2 items-center font-semibold text-white'>
                        <p className='text-cyan-200'>
                          <span>
                            <FaCalendar className='mr-2 h-4 w-4' />
                            {new Date(article.publishedAt).toLocaleString(locale, options)}
                          </span>
                        </p>
                        {article.author && (
                          <p className='text-violet-200'>
                            <span>
                              <FaUser className='mr-2 h-4 w-4' />

                              {article.author}
                            </span>
                          </p>
                        )}
                      </div>
                      <a
                        href={article.url}
                        target='_blank'
                        rel='noreferrer'
                        className='mt-4 flex transform items-center gap-2 self-end rounded-lg bg-white px-4 py-2 text-green-500 shadow-md transition-colors duration-300 hover:bg-green-600 hover:text-white'>
                        Read more <i class='fas fa-arrow-right'></i>
                        <img
                          src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${article.url}`}
                          alt='favicon'
                          className='h-5 w-5'
                        />
                      </a>
                    </div>
                  </div>
                </CardGradientsDark>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </Loading>
  )
}

export default News
