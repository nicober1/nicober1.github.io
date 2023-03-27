import React from 'react'

const BookmarkPage = ({links}) => {
  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='mb-6 text-3xl font-bold'>Bookmarks</h1>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
        {links.map((link, index) => (
          <a key={index} href={link.url} target='_blank' rel='noopener noreferrer' className='rounded-lg bg-blue-200 p-4 shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <div className='mb-2 flex items-center'>
              <img src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${link.url}`} alt={`${link.title} icon`} className='mr-2 h-7 w-7' />
              <h2 className='text-lg font-medium'>{link.title}</h2>
            </div>
            <p className='text-gray-500'>{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default BookmarkPage
