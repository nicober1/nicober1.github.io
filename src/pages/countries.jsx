import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'
import axios from 'axios'
import moment from 'moment-timezone'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function () {
  const [countries, setCountries] = useState([])
  var url = useBaseUrl('/data/countries.json')

  useEffect(() => {
    axios.get(url).then((response) => {
      const sortedCountries = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      setCountries(sortedCountries).catch((error) => console.log(error))
    })
  }, [])

  const getTimeByTimeZone = (timeZone) => {
    const gmtOffset = parseInt(timeZone.substring(4, 6), 10)
    const localTime = moment.utc().add(gmtOffset, 'hours')
    return localTime.format('hh:mm:ss A')
  }
  return (
    <Layout noFooter wrapperClassName='countries-page'>
      <div className='container mx-auto'>
        <h1 className='dark:text-shadow-lg mx-auto mt-10 text-center text-4xl font-bold text-black dark:text-white'>
          Countries of the World
        </h1>
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {countries.map((country) => {
            return (
              <div key={country.cca3} className='overflow-hidden rounded-lg bg-blue-100 shadow-lg dark:bg-blue-100'>
                <img
                  src={country.flags.svg}
                  alt={`${country.name.common} flag`}
                  className='h-48 w-full border-2 border-solid border-cyan-500 object-cover'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>{country.name.common}</h3>
                  <div className='mt-2'>
                    <span className='text-gray-600'>Capital:</span>{' '}
                    <span className='font-semibold text-gray-900'>{country.capital}</span>
                  </div>
                  <div className='mt-2'>
                    <span className='text-gray-600'>Region:</span>{' '}
                    <span className='font-semibold text-gray-900'>{country.region}</span>
                  </div>
                  <div className='mt-2'>
                    <span className='text-gray-600'>Population:</span>{' '}
                    <span className='font-semibold text-gray-900'>{country.population.toLocaleString()}</span>
                  </div>
                  {/* <div className='mt-2'>
                    <span className='text-gray-600'>Local Time:</span> <span className='font-semibold text-gray-900'>{getTimeByTimeZone(country.timezones[0])}</span>
                  </div> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
