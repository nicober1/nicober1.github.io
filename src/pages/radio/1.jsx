import React, {useEffect,useState, useRef} from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import axios from 'axios'
import CardGradientsDark from '@site/src/components/CardGradientsDark'



const useFetchRadioData = (url) => {
  const [data, setRadioData] = useState([])
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
  return {data, loading, error}
}


function RadioButton({id, name, value, label, checked, onChange}) {
  return (
    <div className='flex items-center'>
      <input id={id} name={name} type='radio' value={value} checked={checked} onChange={onChange} className='hidden' />
      <label htmlFor={id} className={`flex cursor-pointer items-center ${checked ? 'text-blue-600' : 'text-gray-600'}`}>
        <span className='mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-gray-300'>
          {checked && <span className='h-2 w-2 rounded-full bg-blue-600'></span>}
        </span>
        {label}
      </label>
    </div>
  )
}


function RadioData() {

  const url = useBaseUrl('/data/radio1.json')
  const {data, loading, error} = useFetchRadioData(url)
  
  const [selectedStationId, setSelectedStationId] = useState(null)

  
  const handleStationChange = (e) => {
    setSelectedStationId(e.target.value)
  }

  
  const stations = data?.pageProps?.data?.stations?.playables || []

  
  const selectedStation = stations.find((station) => station.id === selectedStationId)

  
  const audioRef = useRef()

  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  return (
    <div className='mx-auto max-w-lg p-4'>
      <h1 className='mb-4 text-xl font-bold '>{data?.stations?.title || 'Radio Stations'}</h1>
      <div className='mb-4 grid grid-cols-2 gap-4'>
        {stations.map((station) => (
          <RadioButton
            key={station.id}
            id={station.id}
            name='station'
            value={station.id}
            label={station.name}
            checked={selectedStationId === station.id}
            onChange={handleStationChange}
          />
        ))}
      </div>
      {selectedStation && (
        <div className='flex items-center rounded-lg bg-gray-100 p-4 shadow-lg'>
          <img src={selectedStation.logo100x100} alt={selectedStation.name} className='mr-4 h-16 w-16 rounded-lg' />
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold text-gray-800'>{selectedStation.name}</h2>
            <p className='text-sm text-gray-600'>
              {selectedStation.city}, {selectedStation.country}
            </p>
          
          </div>
          {/* Add an audio element with the stream URL as source */}
          <audio ref={audioRef} src={selectedStation.streams[0].url} />
          {/* Add a button to play or pause the audio */}
          <button onClick={handlePlayPause} className='ml-auto text-blue-600'>
            {audioRef.current?.paused ? 'Play' : 'Pause'}
          </button>
        </div>
      )}
    </div>
  )
}

export default RadioData
