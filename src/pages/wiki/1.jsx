// A React function to use Wikipedia search API and build an encyclopedia page
import React, {useState, useEffect} from 'react'

// A component to display a single Wikipedia result with title and snippet
function WikiCard(props) {
  // Assume props.result is an object with title, snippet and pageid properties
  return (
    <div className='wiki-card' onClick={() => props.onSelect(props.result)}>
      <h4>{props.result.title}</h4>
      <p dangerouslySetInnerHTML={{__html: props.result.snippet}} />
    </div>
  )
}

// A component to display a list of Wikipedia results
function WikiList(props) {
  // Assume props.results is an array of objects with title, snippet and pageid properties
  return (
    <div className='wiki-list'>
      {props.results.map((result) => (
        <WikiCard key={result.pageid} result={result} onSelect={props.onSelect} />
      ))}
    </div>
  )
}

// A component to display a Wikipedia page with title and content
function WikiPage(props) {
  // Assume props.page is an object with title and content properties
  return (
    <div className='wiki-page'>
      <h2>{props.page.title}</h2>
      <div dangerouslySetInnerHTML={{__html: props.page.content}} />
    </div>
  )
}

// A component to display an encyclopedia page with a search input and a list or a page
function Encyclopedia(props) {
  // A state variable to store the search query
  const [query, setQuery] = useState('')
  // A state variable to store the search results
  const [results, setResults] = useState([])
  // A state variable to store the selected page
  const [page, setPage] = useState(null)

  // A function to handle the change of the search input
  function handleChange(event) {
    setQuery(event.target.value)
  }

  // A function to handle the selection of a result
  function handleSelect(result) {
    setPage(result)
  }

  // A function to fetch the search results from the Wikipedia API
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

  // A function to fetch the page content from the Wikipedia API
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

  // An effect hook to fetch the results when the query changes
  useEffect(() => {
    if (query) {
      fetchResults()
    } else {
      setResults([])
    }
  }, [query])

  // An effect hook to fetch the page when the pageid changes
  useEffect(() => {
    if (page && !page.content) {
      fetchPage()
    }
  }, [page])

  return (
    <div className='encyclopedia'>
      <input type='text' value={query} onChange={handleChange} placeholder='Search Wikipedia' />
      {page ? <WikiPage page={page} /> : <WikiList results={results} onSelect={handleSelect} />}
    </div>
  )
}

export default Encyclopedia
