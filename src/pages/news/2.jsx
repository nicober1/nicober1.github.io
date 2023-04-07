import axios from 'axios'
import {useState, useEffect} from 'react'
import businessd from '/data/news/business.json'
import entertainmentd from '/data/news/entertainment.json'
import generald from '/data/news/general.json'
import healthd from '/data/news/health.json'
import scienced from '/data/news/science.json'
import sportsd from '/data/news/sports.json'
import technologyd from '/data/news/technology.json'

// Import react-slick and its CSS
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const News = () => {
  // Create an array of categories and their data
  const categories = [
    {name: 'Business', data: businessd.articles},
    {name: 'Entertainment', data: entertainmentd.articles},
    {name: 'General', data: generald.articles},
    {name: 'Health', data: healthd.articles},
    {name: 'Science', data: scienced.articles},
    {name: 'Sports', data: sportsd.articles},
    {name: 'Technology', data: technologyd.articles},
  ]

  // Define the locale and options for formatting
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

  // Define the settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
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
      {/* Loop through each category and render a slider */}
      {categories.map((category, index) => (
        <div key={index} className='category'>
          <h2 className='text-2xl font-bold'>{category.name}</h2>
          <Slider {...settings}>
            {/* Loop through each article and render a card */}
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
