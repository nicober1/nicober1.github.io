import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'
import DonateButton from '@site/src/components/DonateButton'
import CardGradientsDark from '@site/src/components/CardGradientsDark'

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
const MAX_RADIO_COUNT = 500
const RadioItem = ({radio}) => {
  const {stationuuid, name, country, language, url, homepage, url_resolved, codec, bitrate} = radio
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
      className={`card rounded-lg border   
      ${playing && 'bg-gradient-to-br from-yellow-600 via-red-600 to-pink-600'} 
        relative px-4 py-2 text-white shadow-lg transition-shadow hover:shadow-xl sm:px-6 sm:py-4 md:p-4`}
    >
      <div className='text-medium max-w-xs truncate font-bold sm:max-w-none sm:truncate'>{name}</div>
      <div className='text-sm'>{country.substr(0, 36)}</div>
      <div className='text-sm uppercase'>{language.substr(0, 36)}</div>
      <div className='mt-4 flex items-center justify-between'>
        <audio id={stationuuid} src={url_resolved}></audio>
        <button
          onClick={togglePlay}
          className={`rounded-full bg-white p-2 font-bold uppercase text-black shadow-lg transition-shadow hover:shadow-xl ${
            playing ? 'animate-pulse' : ''
          }`}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        {bitrate !== 0 && (
          <p className='text-xs font-bold'>
            {codec} {bitrate}k
          </p>
        )}

        <a href={homepage} target='_blank' rel='noreferrer' className='ml-4 flex-shrink-0'>
          <img
            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${homepage}`}
            alt={`${name} favicon`}
            className=' h-12 w-12  rounded-lg shadow-md hover:scale-150'
          />
        </a>
      </div>
      {playing && (
        <div className='absolute inset-0 flex items-center justify-center truncate bg-black bg-opacity-25 text-base font-bold'>
          {name}
          <button
            onClick={closeOverlay}
            className='absolute right-2 top-2 rounded-full bg-white p-2 text-black shadow-lg transition-shadow hover:shadow-xl'
          >
            X
          </button>
        </div>
      )}
    </div>
  )
}
export default function RadioDetails() {
  const url = useBaseUrl('/data/radio/cc/GB.json')
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
    <Layout noFooter title='Radio Station'>
      <DonateButton />

      <main className='container mx-auto p-4'>
        <h1 className='text-shadow-lg text-6rem rounded-lg bg-gradient-to-br from-green-600 via-blue-600 to-purple-600  p-4 text-center font-bold text-white'>
          Top Radio Stations of UK
        </h1>
        <div className='mb-4 flex justify-center'>
          <label htmlFor='searchInput' className='sr-only'>
            Search for radio stations
          </label>
          <input
            type='text'
            id='searchInput'
            className='w-100p mt-4 max-w-lg rounded-lg border-gray-300 bg-gradient-to-bl from-green-600
     via-blue-600 to-purple-600 py-2 text-white placeholder-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200
       focus:ring-opacity-50 sm:w-full sm:px-4 sm:text-base md:px-6 md:text-lg'
            placeholder='Find Radio Stations by Name'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {loading && (
          <div className='flex h-full w-full items-center justify-center'>
            <svg className='h-12 w-12 animate-spin text-cyan-500' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm16 0a8 8 0 01-8 8v4a10 10 0 0010-10h-4zm-8 4a4 4 0 100-8 4 4 0 000 8z'
              />
            </svg>
          </div>
        )}
        {error && <div className='text-center text-xl font-semibold text-red-500'>{error.message}</div>}
        {searchResults && searchResults.length > 0 && (
          <div className='container mx-auto'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {searchResults.slice(0, MAX_RADIO_COUNT).map((radio) => (
                <CardGradientsDark>
                  <RadioItem key={radio.stationuuid} radio={radio} />
                </CardGradientsDark>
              ))}
            </div>
          </div>
        )}
        {searchResults && searchResults.length === 0 && (
          <div className='text-center text-xl font-semibold'>
            Sorry, we couldn't find any radio stations matching your search term.
          </div>
        )}
      </main>
    </Layout>
  )
}
