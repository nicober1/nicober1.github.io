import React, {useState} from 'react'

function WorldBankSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const handleSearch = () => {
    // Call the World Bank search API with the search term
    fetch(`https://cors-anywhere.herokuapp.com/https://search.worldbank.org/api/v2/wds?format=json&qterm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the search results state with the API response
        setSearchResults(data)
      })
  }

  const handleInputChange = (event) => {
    // Update the search term state with the user input
    setSearchTerm(event.target.value)
  }

  const handleCardClick = (url) => {
    // Open the document URL in a new tab/window
    window.open(url, '_blank')
  }

  return (
    <div>
      <label htmlFor='searchInput'>Search: </label>
      <input id='searchInput' type='text' value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      {searchResults && (
        <div>
          <p>Showing {searchResults.total} results:</p>
          {Object.values(searchResults.documents).map((document) => (
            <div key={document.id} onClick={() => handleCardClick(document.url)}>
              <h3>{document.display_title}</h3>
              <p>PDF URL: {document.pdfurl}</p>
              <p>Text URL: {document.txturl}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WorldBankSearch
