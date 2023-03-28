

// Require the axios and fs modules
const axios = require('axios');
const fs = require('fs');

// Define an empty array to store the responses
let jsonArray = [];

// Define a function to make the API call for a given id
function makeApiCall(id) {
  // Construct the URL with the access token and id
  let url = 'https://superheroapi.com/api/5974926192594158/' + id

  // Make a GET request to the URL using axios
  axios.get(url)
    .then((res) => {
      // If the request is successful, push the response data to the array
      jsonArray.push(res.data);

      // If the id is less than 3000, make another API call with the next id
      if (id < 750) {
        makeApiCall(id + 1);
      } else {
        // Otherwise, write the JSON array to a file using fs
        fs.writeFile('./static/data/hero1.json', JSON.stringify(jsonArray), (err) => {
          if (err) {
            // If there is an error, log it
            console.error(err.message)
          } else {
            // Otherwise, log a success message
            console.log('JSON array written to output.json')
          }
        })
      }
    })
    .catch((err) => {
      // If the request fails, log the error message
      console.error(err.message);
    });
}

// Start the API call with id = 1
makeApiCall(1);