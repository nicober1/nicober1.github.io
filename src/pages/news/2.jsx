import axios from 'axios'
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
    {name: 'General', data: generald.articles},
    {name: 'Health', data: healthd.articles},
    {name: 'Science', data: scienced.articles},
    {name: 'Sports', data: sportsd.articles},
    {name: 'Technology', data: technologyd.articles},
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
    autoplaySpeed: 2000,
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
    <div className='news container mx-auto my-10'>
      <h1 className='animate-fade-in rounded-lg bg-gradient-to-l from-green-300 to-blue-400 p-4 text-center text-4xl font-bold text-white shadow-2xl'>
        News App
      </h1>
      {categories.map((category, index) => (
        <div key={index} className='category'>
          <h2 className='text-2xl font-bold'>{category.name}</h2>
          <Slider {...settings}>
            {category.data.map((article, index) => (
              <div
                key={index}
                className='card flex transform flex-col rounded-lg bg-gradient-to-bl from-green-400 to-blue-400 p-4 shadow-lg transition-transform duration-300 hover:scale-105'>
                <img src={article.urlToImage} alt={article.title} className='h-48 w-full rounded-t-lg object-cover' />
                <div className='flex flex-grow flex-col'>
                  <h3 className='mt-2 text-xl font-semibold text-white'>{article.title}</h3>
                  <p className='mt-2 text-sm text-white'>{article.description}</p>
                  <div className='mt-2 items-center text-white'>
                    <p>{new Date(article.publishedAt).toLocaleString(locale, options)}</p>
                    {article.author && <p>by {article.author}</p>}
                  </div>
                  <a
                    href={article.url}
                    target='_blank'
                    rel='noreferrer'
                    className='mt-4 transform self-end rounded-lg bg-white px-4 py-2 text-green-500 shadow-md transition-colors  duration-300   hover:bg-green-600 hover:text-white'>
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  )
}

export default News
