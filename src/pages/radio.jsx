import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'
import PropTypes from 'prop-types'

// Define a custom hook to fetch and set the radio data
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

// Define a constant variable for the number of radio stations to display
const RADIO_COUNT = 100

// Use PropTypes to define the shape and type of the radio prop
const RadioItem = ({radio}) => {
  // Use destructuring to access the properties of the radio object
  const {stationuuid, name, country, language, url, homepage} = radio
  return (
    // Use Tailwind CSS utilities to style the radio item
    <div
      key={stationuuid}
      className='rounded-lg border bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 text-white shadow-lg transition-shadow hover:shadow-xl'>
      <div className='truncate text-xl font-bold'>{name}</div>
      <div className='text-lg'>{country}</div>
      <div className='uppercase'>{language}</div>
      {/* <div className=''>{radio.tags}</div> */}
      <div className='mt-4 flex items-center justify-between'>
        <audio src={url} controls></audio>
        <a
          href={homepage}
          target='_blank'
          rel='noreferrer'
          className='ml-4 flex-shrink-0'>
          {/* Use a template literal to construct the favicon URL */}
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain=${homepage}`}
            alt={`${name} favicon`}
            className='h-10 w-10 rounded-full border-2 border-white'
          />
        </a>
      </div>
    </div>
  )
}

// Define the PropTypes for the RadioItem component
RadioItem.propTypes = {
  radio: PropTypes.shape({
    stationuuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    homepage: PropTypes.string,
  }).isRequired,
}

export default function RadioDetails() {
  const url = useBaseUrl('/data/radio.json')
  // Use the custom hook to get the radio data and handle loading and error states
  const {radioData, loading, error} = useRadioData(url)

  return (
    <Layout
      noFooter
      wrapperClassName='fluent'
      title='Radio Details'
      description='List of radio stations'>
      <div className='my-6 text-center'>
        <h1 className='dark:text-shadow-lg mx-auto mt-10 text-center text-4xl font-bold text-black dark:text-white'>
          Top Radio Stations around the World
        </h1>
      </div>
      {/* Add some margin or padding to the bottom of the grid container */}
      <div className='mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {/* Display a loading message while fetching data */}
        {loading && <p>Loading...</p>}
        {/* Display an error message if something went wrong */}
        {error && <p>Something went wrong: {error.message}</p>}
        {/* Display the radio items if data is available */}
        {radioData.slice(0, RADIO_COUNT).map((radio) => (
          <RadioItem radio={radio} key={radio.stationuuid} />
        ))}
      </div>
    </Layout>
  )
}
