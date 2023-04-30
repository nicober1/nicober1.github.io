import {useState, useEffect} from 'react'
import datad from '/data/news/science.json'
import Loading from '@site/src/pages/1Loading'
import NewsCard from '@site/src/pages/news/NewsCard'

const News = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      setArticles(datad.articles)
    }
    fetchNews()
  }, [])

  return (
    <Loading time='0'>
      <div className='news container mx-auto my-10'>
        <h1 className='animate-fade-in rounded-lg bg-gradient-to-l from-green-300 to-blue-400 p-4 text-center text-4xl font-bold text-white shadow-2xl'>
          Science News
        </h1>
        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </Loading>
  )
}

export default News
