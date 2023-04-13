import React from 'react'
import Loading from '@site/src/pages/1Loading'
import CardGradientsDark from '@site/src/components/CardGradientsDark'

const BookCard = ({book}) => {
  return (
    <CardGradientsDark>
      <a href={book.amazonLink} target='_blank' rel='noreferrer'>
        <div className='card flex  overflow-hidden rounded-lg  shadow-lg'>
          <img src={book.bookImage} alt={book.bookTitle} className=' object-cover' />
          <div className='p-4 text-white'>
            <h3 className='text-lg font-bold '>{book.bookTitle}</h3>
            <p className='text-xs '>{book.bookAuthor}</p>
            <p className='text-xs '>{book.description}</p>
            <p className='text-xs '>{book.bookPublisher}</p>
            <p className='text-xs '>Weeks on NYT Best Seller List: {book.weeksOnList}</p>
          </div>
        </div>
      </a>
    </CardGradientsDark>
  )
}

const BookGrid = ({books}) => {
  return (
    <div className='grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
      {books.map((book) => (
        <BookCard key={book.bookTitle} book={book} />
      ))}
    </div>
  )
}

const PageHeader = ({header}) => {
  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 text-white bg-clip-text text-transparent text-center'>
      <h1 className='text-4xl font-bold text-transparent text-center'>{header}</h1>
    </div>
  )
}

const BookPage = ({books, header}) => {
  return (
    <Loading time={0}>
      <div className='min-h-screen'>
        <PageHeader header={header} />
        <BookGrid books={books} />
      </div>
    </Loading>
  )
}

export default BookPage
