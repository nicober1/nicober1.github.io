import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '@theme/Layout'
import useBaseUrl from '@docusaurus/useBaseUrl'


export default function RadioDetails() {
  const [radioData, setRadioData] = useState([])
  var url = useBaseUrl('/data/radio.json')


  useEffect(() => {
    const fetchRadioData = async () => {
      const response = await axios.get(url)
      setRadioData(response.data)
    }

    fetchRadioData()
  }, [])

  return (
    <Layout noFooter wrapperClassName='fluent'>
      <div className='space-y-4 p-4'>
        {radioData.map((radio) => (
          <div key={radio.stationuuid} className='rounded border p-4'>
            <div className='text-xl font-bold'>{radio.name}</div>
            <div className='text-gray-500'>{radio.country}</div>
            <div className='mt-4 flex items-center justify-between'>
              <audio src={radio.url_resolved} controls></audio>
              <a href={radio.homepage}>
                <img
                  src={radio.favicon}
                  alt={radio.name + ' favicon'}
                  className='h-6 w-6'
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
