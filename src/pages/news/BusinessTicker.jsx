import React, {useState, useEffect, useRef} from 'react'
import data from '/data/news/business.json'
import NewsCard from '@site/src/pages/news/NewsCard'

const BusinessTicker = () => {
  return (
    <div className='relative h-[20rem] w-full overflow-x-auto overflow-y-hidden'>
      <div
        className='absolute left-0 top-0 flex h-[20rem] w-auto'
        style={{animation: `slide ${data.articles.length * 2}s linear infinite`}}
      >
        {data.articles
          .filter((article) => article.urlToImage !== null)
          .map((article, index) => {
            return (
              <div key={index} className='h-[20rem] w-[15rem] overflow-y-auto overflow-x-hidden'>
                {article.urlToImage !== null && <NewsCard key={index} article={article} />}
              </div>
            )
          })}
      </div>
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-${data.articles.length * 10}rem);
          }
        }
        .NewsCard {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .NewsCard-image {
          flex: 1;
          object-fit: cover;
        }
        .NewsCard-content {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default BusinessTicker
