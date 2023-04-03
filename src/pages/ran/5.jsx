import React, {useState, useEffect} from 'react'

import data1 from '/data/emoji.json'

function Emoji({emojiId, image, searchTerms, shortcuts}) {
  return (
    <div>
      <span>Emoji ID: {emojiId}</span>
      <img src={image.thumbnails[0].url} alt={searchTerms.join(', ')} />
      <span>Search terms: {searchTerms.join(', ')}</span>
      <span>Shortcuts: {shortcuts.join(', ')}</span>
    </div>
  )
}

// A component that renders an array of emoji objects
function App() {
  // Use useState to create a state variable for the current page and a setter function
  const [page, setPage] = useState(0)

  // Use useState to create a state variable for the current emojis and a setter function
  const [emojis, setEmojis] = useState([])

  // Use useEffect to update the current emojis based on the current page and the data
  useEffect(() => {
    // Use slice to take 100 emojis from the data array at the current page
    const start = page * 100
    const end = start + 100
    const newEmojis = data1.slice(start, end)
    setEmojis(newEmojis)
  }, [page])

  // Use the grid utility classes from Tailwind CSS to create a grid layout for the emojis
  return (
    <div className='container grid grid-cols-10 gap-4'>
      {emojis.map((emoji) => (
        <Emoji key={emoji.emojiId} {...emoji} />
      ))}
      {/* Use the flex and justify-center utility classes from Tailwind CSS to create a pagination bar */}
      <div className='col-span-full flex justify-center'>
        {/* Use buttons and event handlers to increment or decrement the current page and switch between different emojis */}
        {/* Use conditional rendering to disable the buttons when there are no more emojis to show */}
        <button onClick={() => setPage((page) => page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button onClick={() => setPage((page) => page + 1)} disabled={emojis.length < 100}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
