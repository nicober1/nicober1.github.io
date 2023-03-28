import React, {useState, useEffect} from 'react'

// A function component that fetches and displays some information about Kolkata from Wikipedia
export default function KolkataInfo() {
  // Create a state variable to store the information
  const [info, setInfo] = useState('')

  // Use an effect hook to fetch the information from Wikipedia API
  useEffect(() => {
    // Define a function to fetch the information
    const fetchInfo = async () => {
      // Use the query parameter 'action=query&prop=extracts&exintro&explaintext&titles=Kolkata' to get a plain text summary of Kolkata
      const response = await fetch('https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&titles=earth')
      const data = await response.json()

      // Get the first page object from the query result
      const page = data.query.pages[Object.keys(data.query.pages)[0]]

      // Set the state variable with the page extract
      setInfo(page.extract)
    }

    // Call the function
    fetchInfo()
  }, []) // Run the effect only once

  // Return a div element with the information
  return <div>{info}</div>
}
