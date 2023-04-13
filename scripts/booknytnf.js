const axios = require('axios')
const fs = require('fs')
const axiosRetry = require('axios-retry')

// create an axios instance with a base URL
const api = axios.create({
  baseURL: 'https://api.nytimes.com/svc/books/v3/lists',
})

// attach axios-retry to the instance
axiosRetry(api, {
  retries: 5, // number of retries
  retryDelay: (retryCount) => {
    return retryCount * 60 * 1000 // wait for 1 minute between retries
  },
  retryCondition: (error) => {
    // retry only if status code is 429 (Too Many Requests)
    return error.response.status === 429
  },
})
const NYT_API_KEY = 'tNErHGpGWt7JJR4A9sfJH2sMiYx7v4zq'
const AMAZON_ASSOCIATE_TAG = 'fluentblogs-21'
const LIST_NAME = 'hardcover-nonfiction'
const getBestsellerBooks = async () => {
  try {
    const results = []
    let currentDate = new Date()
    const l = 30 // iterate over 52 weeks
    const seenTitles = new Set() // use a Set to store seen titles
    for (let i = 0; i < l; i++) {
      let formattedWeek = currentDate.toISOString().slice(0, 10) // change variable name
      const response = await api.get(
        `/${formattedWeek}/${LIST_NAME}.json?api-key=${NYT_API_KEY}`,
      )
      const books = response.data.results.books
      // use array methods instead of for loop
      const filteredBooks = books
        .map((book) => {
          const publishDate = response.data.results.published_date ?? '' // use nullish coalescing operator
          const bookTitle = book.title ?? '' // use nullish coalescing operator
          const bookAuthor = book.author ?? '' // use nullish coalescing operator
          const bookImage = book.book_image ?? '' // use nullish coalescing operator
          const bookPublisher = book.publisher ?? '' 
          const weeksOnList = book.weeks_on_list ?? '' 
          const description = book.description ?? '' 
          let amazonLink = book.amazon_product_url // use let instead of const
          if (amazonLink) {
            amazonLink = amazonLink.replace(/tag=[^&]+/, `tag=${AMAZON_ASSOCIATE_TAG}`)
          } else {
            amazonLink = '' // use empty string instead of null or undefined
          }
          if (!seenTitles.has(bookTitle)) {
            // check if title has been seen before
            seenTitles.add(bookTitle) // add title to the Set
            return {
              publishDate,
              bookTitle,
              bookAuthor,
              bookImage,
              bookPublisher,
              description,
              weeksOnList,
              amazonLink,
            }
          }
        })
        .filter((book) => book) // remove any null or undefined values from the array
      results.push(...filteredBooks) // use spread operator to flatten array
      currentDate.setDate(currentDate.getDate() - 7) // subtract 7 days from current date
    }
    return results
  } catch (error) {
    console.error(error)
  }
}
const saveBestsellerBooks = async () => {
  try {
    const bestsellerBooks = await getBestsellerBooks()
    const bestsellerBooksJSON = JSON.stringify(bestsellerBooks, null, 2)
    fs.writeFile('./static/data/nyt/bestsellerbookshnf.json', bestsellerBooksJSON, (error) => {
      if (error) throw error
      console.log('Bestseller books data saved to bestseller-books.json')
    })
  } catch (error) {
    console.error(error)
  }
}
saveBestsellerBooks()
