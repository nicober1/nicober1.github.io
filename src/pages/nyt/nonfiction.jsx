import React from 'react'
import books from '/data/nyt/bestsellerbookshnf.json'
import BookPage from '@site/src/components/BookPage'

const HcFiction = () => {
  return <BookPage books={books} header={'NewYork Times Best Seller - HardCover Non-Fiction'} />
}

export default HcFiction
