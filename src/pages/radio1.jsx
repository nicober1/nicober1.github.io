import React, {useState, useEffect, useCallback} from 'react'
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

const useAudio = (url) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const togglePlay = useCallback(() => {
    setPlaying(!playing)
  }, [playing])

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return [playing, togglePlay]
}

const RADIO_COUNT = 100

const RadioItem = ({radio}) => {
  const {stationuuid, name, country, language, url, homepage} = radio
  const [playing, togglePlay] = useAudio(url)

  const closeOverlay = useCallback(() => {
    togglePlay()
  }, [togglePlay])

  return (
    <>
      <div
        className={`rounded-lg border bg-gradient-to-br ${
          playing ? 'from-yellow-400 via-red-500 to-pink-600' : 'from-green-400 via-blue-500 to-purple-600'
        } relative px-4 py-2 text-white shadow-lg transition-shadow hover:shadow-xl sm:px-6 sm:py-4 md:p-4`}>
        <div className='max-w-xs truncate text-xl font-bold sm:max-w-none sm:truncate'>{name}</div>
        <div className='text-lg'>{country}</div>
        <div className='uppercase'>{language}</div>
        <div className='mt-4 flex items-center justify-between'>
          <button onClick={togglePlay} className={`rounded-full bg-white p-2 text-black shadow-lg transition-shadow hover:shadow-xl ${playing ? 'animate-pulse' : ''}`}>
            {playing ? 'Stop' : 'Play'}
          </button>
          <a href={homepage} target='_blank' rel='noreferrer' className='underline'>
            Visit Website
          </a>
        </div>
      </div>
      {playing && (
        <div onClick={closeOverlay} className='fixed inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50'>
          <div className='rounded-lg bg-white p-4 shadow-lg'>
            <h2 className='text-xl font-bold'>Now Playing</h2>
            <p className='text-lg'>{name}</p>
            <p className='text-sm'>{country}</p>
            <p className='text-sm'>{language}</p>
            <button onClick={closeOverlay} className='mt-4 rounded-full bg-red-500 p-2 text-white shadow-lg transition-shadow hover:shadow-xl'>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
