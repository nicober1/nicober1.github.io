import axios from 'axios'
import {useState, useEffect} from 'react'

const News = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=361c9c578cf94c42b04b18cedb1c03f7',
      )
      setArticles(response.data.articles)
    }
    fetchNews()
  }, [])

  return (
    <div className='news container mx-auto my-10'>
      <h1 className='animate-fade-in rounded-lg bg-gradient-to-l from-green-300 to-blue-400 p-4 text-center text-4xl font-bold text-white shadow-2xl'>
        News App
      </h1>
      <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {articles.map((article, index) => (
          <div
            key={index}
            className='card flex transform flex-col rounded-lg bg-gradient-to-bl from-green-400 to-blue-400 p-4 shadow-lg transition-transform duration-300 hover:scale-105'>
            <img src={article.urlToImage} alt={article.title} className='h-48 w-full rounded-t-lg object-cover' />
            <div className='flex flex-grow flex-col'>
              <h2 className='mt-2 text-xl font-semibold text-white'>{article.title}</h2>
              <p className='mt-2 text-sm text-white'>{article.description}</p>
              <a
                href={article.url}
                target='_blank'
                rel='noreferrer'
                className='mt-4 transform self-end rounded-lg bg-white px-4 py-2 text-green-500 shadow-md transition-colors transition-transform duration-300 duration-300 hover:rotate-90 hover:bg-green-600 hover:text-white'>
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News