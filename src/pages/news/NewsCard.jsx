import {FaUser, FaCalendar} from 'react-icons/fa'
import CardGradientsDark from '@site/src/components/CardGradientsDark'

function NewsCard({article}) {
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

  return (
    <CardGradientsDark>
      <div className='card flex flex-col items-start rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105'>
        <img
          src={article.urlToImage}
          alt={article.title}
          className='transition-brightness h-48 w-full rounded-lg object-cover brightness-100 filter duration-300 hover:brightness-75'
        />
        <div className='flex flex-grow flex-col justify-between'>
          <div>
            <h3 className='mb-2 mt-4 text-2xl font-semibold text-white'>
              <span className='text-shadow-lg' style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                {article.title.split('-')[0]}
              </span>
            </h3>
            <p className='mb-4 text-lg text-white'>{article.description}</p>
          </div>
          <div className='mt-2 flex w-full justify-between'>
            <div className='flex items-center text-cyan-200'>
              <FaCalendar className='mr-2 h-4 w-4' />
              <span>{new Date(article.publishedAt).toLocaleString(locale, options)}</span>
            </div>
            {article.author && (
              <div className='flex items-center text-violet-200'>
                <FaUser className='mr-2 h-4 w-4' />
                <span>{article.author}</span>
              </div>
            )}
          </div>
        </div>
        <a
          href={article.url}
          target='_blank'
          rel='noreferrer'
          className='mt-4 flex items-center gap-2 self-end rounded-lg bg-white px-4 py-2 text-green-500 shadow-md transition-colors duration-300 hover:bg-green-600 hover:text-white'>
          <span>Read more</span>
          <i className='fas fa-arrow-right'></i>
          <img
            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${article.url}`}
            alt='favicon'
            className='h-5 w-5'
          />
        </a>
      </div>
    </CardGradientsDark>
  )
}

export default NewsCard
