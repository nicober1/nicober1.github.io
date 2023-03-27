const axios = require('axios')
const fs = require('fs')

function downloadFile(url, loc) {
  axios
    .get(url)
    .then((response) => {
      const jsonData = JSON.stringify(response.data, null, 2)

      fs.writeFileSync(loc, jsonData, (err) => {
        if (err) throw err
        console.log('Data saved to file.')
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

downloadFile(
  'https://api.coincap.io/v2/assets?limit=2000',
  './static/data/crypto.json',
)
downloadFile(
  'https://restcountries.com/v3.1/all',
  './static/data/countries.json',
)
downloadFile(
  'https://neelpatel05.pythonanywhere.com',
  './static/data/elements.json',
)
downloadFile(
  'https://de1.api.radio-browser.info/json/stations/topclick/120',
  './static/data/radio.json',
)