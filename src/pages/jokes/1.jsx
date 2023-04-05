import React, {useState} from 'react'
import {Remark} from 'react-remark'

// Create a functional component
const Joke = () => {
  // Define a state variable to store the joke
  const [joke, setJoke] = useState('')

  // Define a function to call the API and update the joke
  const getJoke = async () => {
    // Use fetch to get a random joke from an API
    const response = await fetch('https://official-joke-api.appspot.com/random_joke')
    // Convert the response to JSON
    const data = await response.json()
    // Set the joke state to the joke from the data
    setJoke(data)
  }

  // Return some JSX code that displays the joke or a button
  return (
    <div>
      {/* Use conditional rendering to show the joke or the button */}
      {joke ? (
        <Remark>
          {`# ${joke.setup}

${joke.punchline}`}
        </Remark>
      ) : (
        <button onClick={getJoke}>Get a joke</button>
      )}
    </div>
  )
}

export default Joke
