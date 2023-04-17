import React, {useState, useEffect} from 'react'
import './1.css'
function WikiCard(props) {
  return (
    <div
      className='transform cursor-pointer rounded-md bg-white p-4 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg'
      onClick={() => props.onSelect(props.result)}>
      <h4 className='mb-2 text-lg font-medium text-black'>{props.result.title}</h4>
      <p className='text-black' dangerouslySetInnerHTML={{__html: props.result.snippet}} />
    </div>
  )
}
function WikiList(props) {
  return (
    <div className='wiki-list'>
      {props.results.map((result) => (
        <WikiCard key={result.pageid} result={result} onSelect={props.onSelect} />
      ))}
    </div>
  )
}
function WikiPage(props) {
  return (
    <div className='wiki-page'>
      <h2 className='mb-4 text-2xl font-bold'>{props.page.title}</h2>
      <div dangerouslySetInnerHTML={{__html: props.page.content}} />
    </div>
  )
}
export default function Encyclopedia(props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(null)
  function handleChange(event) {
    setQuery(event.target.value)
  }
  function handleSelect(result) {
    setPage(result)
  }
  async function fetchResults() {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${query}`,
      )
      const data = await response.json()
      setResults(data.query.search)
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchPage() {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&pageid=${page.pageid}`,
      )
      const data = await response.json()
      setPage({...page, content: data.parse.text['*']})
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (query) {
      fetchResults()
    } else {
      setResults([])
    }
  }, [query])
  useEffect(() => {
    if (page && !page.content) {
      fetchPage()
    }
  }, [page])
  return (
    <div className='encyclopedia flex flex-col gap-4'>
      <input
        className='rounded border border-gray-300 p-2'
        type='text'
        value={query}
        onChange={handleChange}
        placeholder='Search Wikipedia'
      />
      {page ? <WikiPage page={page} /> : <WikiList results={results} onSelect={handleSelect} />}
    </div>
  )
}
