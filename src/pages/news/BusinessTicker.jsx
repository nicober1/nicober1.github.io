import React, {useState, useEffect} from 'react'
import data from '/data/news/business.json'
import NewsCard from '@site/src/pages/news/NewsCard'

const BusinessTicker = () => {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((position) => position + 1)
    }, 20)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      className='h-[3rem] flex flex-shrink w-full items-center object-contain ' 
      style={{transform: `translateX(-${position * 2}px)`}}>
      {data.articles.map((article, index) => {
        return (
          <div key={index} className=''>
            <NewsCard key={index} article={article} />
          </div>
        )
      })}
    </div>
  )
}

export default BusinessTicker
