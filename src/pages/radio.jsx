import React, {useState, useEffect,useRef} from 'react'
import axios from 'axios'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'
const useFetchRadioData = (url) => {
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
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const togglePlay = () => {
    setPlaying(!playing)
    const audio = document.getElementById(stationuuid)
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
  }
  
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
      } relative px-4 py-2 text-white shadow-lg transition-shadow hover:shadow-xl sm:px-6 sm:py-4 md:p-4`}>
      <div className='max-w-xs truncate text-xl font-bold sm:max-w-none sm:truncate'>{name}</div>
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
      {playing && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-3xl font-bold'>
          {name}
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
  const {radioData, loading, error} = useFetchRadioData(url)
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
  const handleSearchChange = ({target: {value}}) => {
    setSearchTerm(value)
  }
  return (
    <Layout title='World Radio'>
      <main className='container mx-auto p-4'>
        <h1 className='mb-8 text-center text-4xl font-bold'>World Radio</h1>
        <div className='mb-4'>
          <label htmlFor='searchInput' className='sr-only'>
            Search for radio stations
          </label>
          <input
            type='text'
            id='searchInput'
            className='w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='Search by Name or Country...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {loading && (
          <div className='flex h-full w-full items-center justify-center'>
            <svg className='h-12 w-12 animate-spin text-gray-400' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm16 0a8 8 0 01-8 8v4a10 10 0 0010-10h-4zm-8 4a4 4 0 100-8 4 4 0 000 8z' />
            </svg>
          </div>
        )}
        {error && <div className='text-center text-xl font-semibold text-red-500'>{error.message}</div>}
        {searchResults && searchResults.length > 0 && (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
            {searchResults.slice(0, RADIO_COUNT).map((radio) => (
              <RadioItem key={radio.stationuuid} radio={radio} />
            ))}
          </div>
        )}
        {searchResults && searchResults.length === 0 && <div className='text-center text-xl font-semibold'>Sorry, we couldn't find any radio stations matching your search term.</div>}
      </main>
    </Layout>
  )
}
