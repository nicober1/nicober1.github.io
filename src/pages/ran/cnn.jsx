import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as cheerio from 'cheerio'

const Headlines = () => {
  const [headlines, setHeadlines] = useState([])

  useEffect(() => {
    // Define an async function that will scrape headlines from CNN
    const scrapeHeadlines = async () => {
      // Fetch the HTML content of CNN homepage
      const response = await axios.get('https://edition.cnn.com/')
      // Load the HTML content into cheerio
      const $ = cheerio.load(response.data)
      // Find all the elements with the class name "cd__headline-text"
      const elements = $('.cd__headline-text')
      // Map each element to its text content
      const headlines = elements.map((index, element) => $(element).text()).get()
      // Return the headlines array
      return headlines
    }

    // Call the scrapeHeadlines function and update the state with the result
    scrapeHeadlines()
      .then((headlines) => {
        setHeadlines(headlines)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className='headlines'>
      <h1>CNN Headlines</h1>
      <ul>
        {headlines.map((headline, index) => (
          <li key={index}>{headline}</li>
        ))}
      </ul>
    </div>
  )
}

export default Headlines
