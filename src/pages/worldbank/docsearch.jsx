import React, {useState} from 'react'
import Layout from '@theme/Layout'
import HeaderTypeWriter from '@site/src/components/HeaderTypeWriter'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

function WorldBankSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)
    const url =
      'https://corsproxy.io/?' +
      encodeURIComponent(
        `https://search.worldbank.org/api/v2/wds?format=json&qterm=${searchTerm}&sort=docdt&order=desc&rows=100`,
      )
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data)
        setIsLoading(false)
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
        {isLoading ? (
          <div className='mt-4 flex justify-center'>
            <FontAwesomeIcon icon={faSpinner} spin size='3x' />
          </div>
        ) : searchResults ? (
          <div>
            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Object.values(searchResults.documents)
                .sort((a, b) => new Date(b.docdt) - new Date(a.docdt))
                .map((document) => (
                  <div
                    key={document.id}
                    className='card rounded-lg border border-gray-300 p-4 shadow transition duration-300 hover:shadow-lg'
                  >
                    <h3 className='card-title text-lg font-bold'>{document.display_title}</h3>
                    <h6 className='card-title text-lg font-bold'>{new Date(document.docdt).toLocaleDateString()}</h6>
                    <a href={document.url} target='_blank' rel='noopener noreferrer' className='card-link'>
                      View DOC
                    </a>
                    <a href={document.pdfurl} target='_blank' rel='noopener noreferrer' className='card-link'>
                      View PDF
                    </a>
                    <a href={document.txturl} target='_blank' rel='noopener noreferrer' className='card-link'>
                      View TXT
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

export default WorldBankSearch
