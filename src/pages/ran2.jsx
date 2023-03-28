import React, {useState, useEffect} from 'react'
import {parse} from 'node-html-parser'

// A function component that fetches and displays some popular attractions of Kolkata from Bing Travel
export default function KolkataAttractions() {
  // Create a state variable to store the attractions
  const [attractions, setAttractions] = useState([])

  // Use an effect hook to fetch the attractions from Bing Travel API
  useEffect(() => {
    // Define a function to fetch the attractions
    const fetchAttractions = async () => {
      // Use a proxy URL to bypass the CORS issue
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

      // Use the query parameter 'q=Kolkata' to get information about Kolkata
      const response = await fetch(proxyUrl + 'https://www.bing.com/travel/place-information?q=Kolkata&SID=e5f8e89d-f3e0-3a9e-7b62-24348d526819&form=CGTDGB')
      const data = await response.text()

      // Parse the HTML response and convert it into a DOM tree
      const root = parse(data)

      // Find the element that contains the popular attractions list
      const list = root.querySelector('.b_vlist2col.b_deep')

      // Get the children elements of the list
      const items = list.childNodes

      // Map each item element to an object with attraction name and categories
      const attractions = items.map((item) => {
        // Get the name element of the item
        const name = item.querySelector('.b_subModule').text

        // Get the categories element of the item
        const categories = item.querySelector('.b_secondaryText').text

        // Return an object with name and categories properties
        return {
          name: name,
          categories: categories,
        }
      })

      // Set the state variable with the attractions array
      setAttractions(attractions)
    }

    // Call the function
    fetchAttractions()
  }, []) // Run the effect only once

  // Return a div element with a list of attractions
  return (
    <div>
      <h1>Some popular attractions of Kolkata</h1>
      <ul>
        {attractions.map((attraction) => (
          <li key={attraction.name}>
            {attraction.name} - {attraction.categories}
          </li>
        ))}
      </ul>
    </div>
  )
}
