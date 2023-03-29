// Import the modules
const axios = require('axios')
const fs = require('fs')
// Define the API key and the base URL for the videos.list method
const API_KEY = 'AIzaSyC7aNg_UBZlCHC13MHukveVKEcstbXruSg'
const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos'
// Define the input and output file names
const inputFile = './static/data/youtube1.json'
const outputFile = './static/data/youtube11.json'
// Define an async function to read the input file and write the output file
const processFile = async () => {
  try {
    // Read the input file and parse it as a JSON array
    const fileContent = fs.readFileSync(inputFile, 'utf8')
    const data = JSON.parse(fileContent)
    // Check if data is an array
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array.')
    }
    // Map the data array to extract the video ids
    const videoIds = data.map((item) => item.snippet.resourceId.videoId)
    // Use axios to get the response from the API
    const response = await axios.get(BASE_URL, {
      params: {
        part: 'statistics',
        id: videoIds.join(','),
        key: API_KEY,
      },
    })
    // Map the response items array to create a new array with video id and view count
    const output = response.data.items.map((item) => ({
      videoId: item.id,
      viewCount: item.statistics.viewCount,
    }))
    // Stringify the output array and write it to the output file
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf8')
    // Log a success message
    console.log('Output file written successfully.')
  } catch (error) {
    // Handle any errors
    console.error(error)
  }
}
processFile()
