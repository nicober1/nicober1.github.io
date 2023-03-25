import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'

const RadioItem = ({radio}) => (
  <div
    key={radio.stationuuid}
    className='rounded-lg border bg-cyan-500 p-10 text-black'>
    <div className='text-2xl font-bold'>{radio.name}</div>
    <div className='text-lg font-bold'>{radio.country}</div>
    <div className='uppercase'>{radio.language}</div>
    <div className=''>{radio.tags}</div>
    <div className='mt-4 flex items-center justify-between'>
      <audio src={radio.url_resolved} controls></audio>
      <a href={radio?.homepage} target='_blank'>
        <img
          src={`https://www.google.com/s2/favicons?sz=300&domain=${radio?.homepage}`}
          alt={radio?.name + ' favicon'}
          // className='h-15 w-15'
        />
      </a>
    </div>
  </div>
)

export default function RadioDetails() {
  const [radioData, setRadioData] = useState([])
  const url = useBaseUrl('/data/radio.json')

  useEffect(() => {
    const fetchRadioData = async () => {
      const response = await axios.get(url)
      setRadioData(response.data)
    }

    fetchRadioData()
  }, [])

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
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {radioData.slice(0, 100).map((radio) => (
          <RadioItem radio={radio} />
        ))}
      </div>
    </Layout>
  )
}
