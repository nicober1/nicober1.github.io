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

   if (!article || !article.urlToImage) {
     return null
   }

  return (
    <CardGradientsDark>
      <div className='card flex flex-col items-start rounded-lg p-4 shadow-lg transition-transform duration-300 hover:scale-105'>
        <div className='image-container h-48 w-full overflow-hidden rounded-lg'>
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className='h-full w-full object-cover brightness-100 filter transition-all duration-300 hover:brightness-75'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${article.url}`
              }}
            />
          ) : (
            <img
              src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${article.url}`}
              alt='favicon'
              className='h-full w-full object-cover brightness-100 filter transition-all duration-300 hover:brightness-75'
            />
          )}
        </div>

        <div className='mt-4 flex w-full flex-col justify-between'>
          <div className='flex w-full flex-col items-start justify-start'>
            <h3 className='title-with-shadow mb-2 text-lg font-bold leading-tight text-white'>
              {article.title.split('-')[0]}
            </h3>
            {article.description ? (
              <p className='title-with-shadow  mb-4 text-sm leading-snug text-gray-100'>{article.description}</p>
            ) : (
              <p className='title-with-shadow  mb-4 text-sm leading-snug text-gray-100'>{article.title}</p>
            )}
          </div>
          <div className='mt-2 flex w-full items-center justify-between'>
            <div className='title-with-shadow flex items-center text-xs text-fuchsia-200'>
              <FaCalendar className='mr-2 h-4 w-4' />
              <span>{new Date(article.publishedAt).toLocaleString(locale, options)}</span>
            </div>
            {article.author && (
              <div className='title-with-shadow flex items-center text-xs text-cyan-200'>
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
