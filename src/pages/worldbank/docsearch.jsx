import React, {useState} from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import HeaderTypeWriter from '@site/src/components/HeaderTypeWriter'

function WorldBankSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const handleSearch = () => {
    const url =
      'https://corsproxy.io/?' +
      encodeURIComponent(
        `https://cors-anywhere.herokuapp.com/https://search.worldbank.org/api/v2/wds?format=json&qterm=${searchTerm}`,
      )
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data)
      })
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <Layout noFooter>
      <div className='container mx-auto p-4'>
        <div className='flex items-center'>
          <label htmlFor='searchInput' className='mr-2'>
            Search:{' '}
          </label>
          <input
            id='searchInput'
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            className='rounded border border-gray-300 px-2 py-1'
          />
          <button onClick={handleSearch} className='ml-2 rounded bg-blue-500 px-4 py-2 text-white'>
            Search
          </button>
        </div>
        {searchResults && (
          <div>
            <p className='mt-4'>Showing {searchResults.total} results:</p>
            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Object.values(searchResults.documents).map((document) => (
                <div className='card rounded border border-gray-300 p-4 shadow transition duration-300 hover:shadow-lg'>
                  <h3 className='card-title text-lg font-bold'>{document.display_title}</h3>
                  <a href={document.url} className='card-text text-sm '>
                    DOC URL
                  </a>
                  <a href={document.pdfurl} className='card-text text-sm '>
                    PDF URL
                  </a>
                  <a href={document.txturl} className='card-text text-sm '>
                    TXT URL
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default WorldBankSearch
