import Loading from '@site/src/pages/1Loading'

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
import NewsCard from '@site/src/pages/news/NewsCard'


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
    autoplaySpeed: 4000,
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
                <NewsCard key={index} article={article} />
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </Loading>
  )
}

export default News
