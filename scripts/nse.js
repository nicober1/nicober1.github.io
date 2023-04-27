const axios = require('axios')
const fs = require('fs')
const fetchfo = async () => {
  const url = `https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O`
  try {
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        'User-Agent': 'My Node App',
      },
    })
    const data = response.data
    if (response.status === 200 && data.data.length > 0) {
      const json = JSON.stringify(data, null, 2)
      const fileName = `./static/data/nse/fo.json`
      fs.writeFileSync(fileName, json)
      console.log('File written successfully')
    } else {
      console.log('Invalid response or empty data')
    }
  } catch (error) {
    console.error(error)
  }
}

fetchfo()
