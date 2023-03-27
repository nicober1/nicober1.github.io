import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'
const useRadioData = (url) => {
  const [radioData, setRadioData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchRadioData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(url)
        setRadioData(response.data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fetchRadioData()
  }, [url])
  return {radioData, loading, error}
}
const RADIO_COUNT = 100
const RadioItem = ({radio}) => {
  const {stationuuid, name, country, language, url, homepage} = radio
  // Use a state variable to track the playing status of the audio
  const [playing, setPlaying] = useState(false)
  // Define a function to toggle the playing state and update the audio element
  const togglePlay = () => {
    setPlaying(!playing)
    const audio = document.getElementById(stationuuid)
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
  }
  // Define a function to close the overlay and pause the audio
  const closeOverlay = () => {
    setPlaying(false)
    const audio = document.getElementById(stationuuid)
    audio.pause()
  }
  return (
    <div
      key={stationuuid}
      className={`rounded-lg border bg-gradient-to-br ${
        playing ? 'from-yellow-400 via-red-500 to-pink-600' : 'from-green-400 via-blue-500 to-purple-600'
      } relative p-4 text-white shadow-lg transition-shadow hover:shadow-xl`}>
      <div className='truncate text-xl font-bold'>{name}</div>
      <div className='text-lg'>{country}</div>
      <div className='uppercase'>{language}</div>
      <div className='mt-4 flex items-center justify-between'>
        <audio id={stationuuid} src={url}></audio>
        <button onClick={togglePlay} className={`rounded-full bg-white p-2 text-black shadow-lg transition-shadow hover:shadow-xl ${playing ? 'animate-pulse' : ''}`}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <a href={homepage} target='_blank' rel='noreferrer' className='ml-4 flex-shrink-0'>
          <img src={`https://www.google.com/s2/favicons?sz=64&domain=${homepage}`} alt={`${name} favicon`} className='h-10 w-10 rounded-full border-2 border-white' />
        </a>
      </div>
      {/* Add an overlay div to show the station name when playing */}
      {playing && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-3xl font-bold'>
          {name}
          {/* Add a close button to hide the overlay */}
          <button onClick={closeOverlay} className='absolute top-2 right-2 rounded-full bg-white p-2 text-black shadow-lg transition-shadow hover:shadow-xl'>
            X
          </button>
        </div>
      )}
    </div>
  )
}
export default function RadioDetails() {
  const url = useBaseUrl('/data/radio.json')
  const {radioData, loading, error} = useRadioData(url)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    if (radioData && radioData.length > 0) {
      const filteredResults = radioData.filter((radio) => {
        const searchRegex = new RegExp(searchTerm, 'i')
        return searchRegex.test(radio.name) || searchRegex.test(radio.country)
      })
      setSearchResults(filteredResults)
    }
  }, [radioData, searchTerm])
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
  return (
    <Layout title='Radio Details'>
      <main className='container mx-auto p-4'>
        <h1 className='mb-8 text-center text-4xl font-bold'>Radio Details</h1>
        <div className='mb-4'>
          <label htmlFor='searchInput' className='sr-only'>
            Search for radio stations
          </label>
          <input
            type='text'
            id='searchInput'
            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='Search by name or country...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {loading && <div className='text-center text-xl font-semibold'>Loading...</div>}
        {error && <div className='text-center text-xl font-semibold text-red-500'>{error.message}</div>}
        {searchResults && searchResults.length > 0 && (
          <div className='grid grid-cols-3 gap-4'>
            {searchResults.slice(0, RADIO_COUNT).map((radio) => (
              <RadioItem key={radio.stationuuid} radio={radio} />
            ))}
          </div>
        )}
        {searchResults && searchResults.length === 0 && <div className='text-center text-xl font-semibold'>No radio stations found</div>}
      </main>
    </Layout>
  )
}
