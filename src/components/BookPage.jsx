import React from 'react'
import Loading from '@site/src/pages/1Loading'
import CardGradientsDark from '@site/src/components/CardGradientsDark'

const BookCard = ({book}) => {
  return (
    <CardGradientsDark>
      <a href={book.amazonLink} target='_blank' rel='noreferrer'>
        <div className='card flex flex-col overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105'>
          <div className='relative h-96 w-full'>
            <img src={book.bookImage} alt={book.bookTitle} className='absolute inset-0 h-full w-full ' />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70'></div>
            <div className='absolute bottom-0 left-0 p-2 text-white'>
              <h3 className='text-lg font-bold'>{book.bookTitle}</h3>
              <p className='text-sm'>{book.bookAuthor}</p>
            </div>
          </div>
          <div className='p-4 text-white'>
            <p className='text-sm'>{book.description}</p>
            <div className='mt-2 flex items-center justify-between'>
              <p className='text-xs'>Publisher: {book.bookPublisher}</p>
              <p className='text-xs'>{book.weeksOnList} Weeks on NYT Best Seller List</p>
            </div>
          </div>
        </div>
      </a>
    </CardGradientsDark>
  )
}

const BookGrid = ({books}) => {
  return (
    <div className='grid grid-cols-4 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {books.map((book) => (
        <BookCard key={book.bookTitle} book={book} />
      ))}
    </div>
  )
}

const PageHeader = ({header}) => {
  return (
    <div
      className='  p-8 text-center  text-black'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80)', // add a background image for the header
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <h1 className='text-center text-4xl font-bold '>{header}</h1>
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
