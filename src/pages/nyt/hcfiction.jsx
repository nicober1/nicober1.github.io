import React from 'react'
import books from '/data/nyt/bestsellerbooks.json'
import BookPage from './BookPage'

const HcFiction = () => {
  return <BookPage books={books} header={'NewYork Times Best Seller - HardCover Fiction'} />
}

export default HcFiction
