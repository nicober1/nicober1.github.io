import React, {useState} from 'react'
import axios from 'axios'

export default function App() {
  const [word, setWord] = useState('') // state for storing the input word
  const [synonyms, setSynonyms] = useState([]) // state for storing the synonyms
  const [antonyms, setAntonyms] = useState([]) // state for storing the antonyms
  const [example, setExample] = useState('') // state for storing the example sentence

  const handleChange = (e) => {
    setWord(e.target.value) // update the input word
  }

  const handleSubmit = (e) => {
    e.preventDefault() // prevent default form submission
    // fetch data from Datamuse API
    axios
      .get(`https://api.datamuse.com/words?rel_syn=${word}&md=d`)
      .then((res) => {
        // update the synonyms state with the data
        setSynonyms(res.data.map((item) => item.word))
        // get the first result that has an example sentence
        const exampleItem = res.data.find((item) => item.defs && item.defs.length > 0)
        // update the example state with the sentence
        setExample(exampleItem ? exampleItem.defs[0].split('\t')[1] : '')
      })
      .catch((err) => console.log(err))
    axios
      .get(`https://api.datamuse.com/words?rel_ant=${word}`)
      .then((res) => {
        // update the antonyms state with the data
        setAntonyms(res.data.map((item) => item.word))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-8 text-4xl font-bold'>Synonym and Antonym Finder</h1>
      <form onSubmit={handleSubmit} className='mb-8 flex items-center'>
        <input type='text' value={word} onChange={handleChange} placeholder='Enter a word' className='mr-4 rounded border p-2' />
        <button type='submit' className='rounded bg-blue-500 p-2 text-white'>
          Search
        </button>
      </form>
      <div className='grid grid-cols-2 gap-4'>
        <div className='rounded border p-4'>
          <h2 className='text-2xl font-semibold'>Synonyms</h2>
          <ul className='list-disc pl-4'>
            {synonyms.map((syn) => (
              <li key={syn}>{syn}</li>
            ))}
          </ul>
        </div>
        <div className='rounded border p-4'>
          <h2 className='text-2xl font-semibold'>Antonyms</h2>
          <ul className='list-disc pl-4'>
            {antonyms.map((ant) => (
              <li key={ant}>{ant}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-8 rounded border p-4'>
        <h2 className='text-2xl font-semibold'>Example</h2>
        <p className='text-gray-600'>{example}</p>
      </div>
    </div>
  )
}

