import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'

function WikiCard({result, onSelect}) {
  return (
    <div
      className='transform cursor-pointer rounded-md bg-white p-4 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg'
      onClick={() => onSelect(result)}>
      <h4 className='mb-2 text-lg font-medium text-black'>{result.title}</h4>
      {result.thumbnail && (
        <img
          src={result.thumbnail.source}
          alt={result.title}
          width={result.thumbnail.width}
          height={result.thumbnail.height}
          className='mb-2'
        />
      )}
      <p className='text-black' dangerouslySetInnerHTML={{__html: result.snippet}} />
      {result.description && <p className='text-gray-600'>{result.description}</p>}
    </div>
  )
}

function WikiList({results, onSelect}) {
  return (
    <div className='wiki-list grid grid-cols-2 gap-4 sm:grid-cols-2 mt-20'>
      {results.map((result) => (
        <WikiCard key={result.pageid} result={result} onSelect={onSelect} />
      ))}
    </div>
  )
}

function WikiPage({page}) {
  function handleClick(event) {
    const targetLink = event.target.closest('a')
    if (!targetLink) return
    event.preventDefault()
    const searchText = targetLink.textContent
    const encodedText = encodeURIComponent(searchText)
    const wikiSearchURL = `https://en.wikipedia.org/wiki/${encodedText}`
    const googleSearchURL = `https://www.google.com/search?q=${encodedText}`
    const bingSearchURL = `https://www.bing.com/search?q=${encodedText}`
    const duckDuckGoSearchURL = `https://duckduckgo.com/?q=${encodedText}`
    window.open(wikiSearchURL, 'wikipedia')
    window.open(googleSearchURL, 'google')
    window.open(bingSearchURL, 'bing')
    window.open(duckDuckGoSearchURL, 'duck')
  }
  return (
    <div className='wiki-page overflow-y-scroll' onClick={handleClick}>
      <h2 className='page-title'>{page.title}</h2>
      <div className='page-content' dangerouslySetInnerHTML={{__html: page.content}} />
    </div>
  )
}

export default function Encyclopedia() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(null)

  function handleChange(event) {
    const {value} = event.target
    setQuery(value)
    setPage(null)
  }

  async function fetchResults() {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srprop=snippet|sectiontitle|description|thumbnail|wordcount&srlimit=10&srsearch=${query}`,
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
    }
  }, [query])

  useEffect(() => {
    if (page && !page.content) {
      fetchPage()
    }
  }, [page])

  return (
    <Layout>
      <div className='grid grid-cols-2 px-4 py-8 '>
        <div className='mx-auto w-full max-w-md'>
          <input
            type='text'
            value={query}
            onChange={handleChange}
            placeholder='Type here to search on Wikipedia'
            className={`w-full rounded-md border border-white p-2 dark:placeholder-white placeholder-black`}
          />
          {results.length > 0 && <WikiList results={results} onSelect={setPage} />}
        </div>

        <div className='mx-auto  w-full max-w-7xl'>{page && <WikiPage page={page} />}</div>
      </div>
    </Layout>
  )
}
