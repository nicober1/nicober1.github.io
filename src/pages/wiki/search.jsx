import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'

function WikiCard({result, onSelect}) {
  return (
    <div
      className='transform cursor-pointer rounded-md bg-white p-4 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg'
      onClick={() => onSelect(result)}>
      <h4 className='mb-2 text-lg font-medium text-black'>{result.title}</h4>
      <p className='text-black' dangerouslySetInnerHTML={{__html: result.snippet}} />
    </div>
  )
}

function WikiList({results, onSelect}) {
  return (
    <div className='wiki-list grid grid-cols-2 gap-4 sm:grid-cols-2'>
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
    const googleSearchURL = `https://www.google.com/search?q=${encodedText}`
    const bingSearchURL = `https://www.bing.com/search?q=${encodedText}`
    const duckDuckGoSearchURL = `https://duckduckgo.com/?q=${encodedText}`
    window.open(googleSearchURL, '_blank')
    window.open(bingSearchURL, '_blank')
    window.open(duckDuckGoSearchURL, '_blank')
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
  const [searchClass, setSearchClass] = useState('search-input')
  const [mainContainerClass, setMainContainerClass] = useState('main-container-center')

  function handleChange(event) {
    const {value} = event.target
    setQuery(value)
    setSearchClass(value ? '' : 'search-input')
    setMainContainerClass(value ? 'main-container-top' : 'main-container-center')
    setPage(null)
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
            className={`w-full rounded-md border border-gray-300 p-2`}
          />
          {results.length > 0 && <WikiList results={results} onSelect={setPage} />}
        </div>

        <div className='mx-auto  w-full max-w-7xl'>{page && <WikiPage page={page} />}</div>
      </div>
    </Layout>
  )
}
