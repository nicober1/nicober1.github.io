// Import axios and fs modules
const axios = require('axios')
const fs = require('fs')

// Define the topics to fetch news from
const topics = ['business', 'entertainment', 'health', 'science', 'sports', 'technology','general']
const language = 'en'

// Define the API key and base URL for News API
const apiKey = '361c9c578cf94c42b04b18cedb1c03f7'
const baseUrl = 'https://newsapi.org/v2/top-headlines'


// Define a function to fetch news for a given topic and save to a file
const fetchNews = async (topic) => {
  try {
    // Construct the full URL with the topic and API key as query parameters
    const url = `${baseUrl}?category=${topic}&language=${language}&pageSize=100&apiKey=${apiKey}`

    // Make a GET request using axios and get the response data
    const response = await axios.get(url)
    const data = response.data

    // Check if the status is ok and there are articles in the data
    if (data.status === 'ok' && data.articles.length > 0) {
      // Convert the data to JSON string with indentation
      const json = JSON.stringify(data, null, 2)

      // Define the file name with the topic as prefix
      const fileName = `./static/data/news/${topic}.json`

      // Write the JSON string to the file using fs
      fs.writeFile(fileName, json, (err) => {
        if (err) {
          // Handle any errors while writing to the file
          console.error(`Error writing to ${fileName}: ${err.message}`)
        } else {
          // Log a success message if the file is written successfully
          console.log(`News for ${topic} saved to ${fileName}`)
        }
      })
    } else {
      // Log a message if there are no articles for the topic
      console.log(`No news found for ${topic}`)
    }
  } catch (err) {
    // Handle any errors while making the request or parsing the data
    console.error(`Error fetching news for ${topic}: ${err.message}`)
  }
}

// Loop through the topics and call the fetchNews function for each one
topics.forEach((topic) => {
  fetchNews(topic)
})
