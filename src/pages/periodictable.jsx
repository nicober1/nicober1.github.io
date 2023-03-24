import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'
import axios from 'axios'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function () {
  const [elements, setElements] = useState([])
  var url = useBaseUrl('/data/elements.json')

  useEffect(() => {
    axios.get(url).then((response) => {
      const sortedCountries = response.data
      setElements(sortedCountries).catch((error) => console.log(error))
    })
  }, [])

  return (
    <Layout noFooter wrapperClassName='countries-page'>
      <div className='container mx-auto'>
        <h1 className='dark:text-shadow-lg mx-auto mt-10 text-center text-4xl font-bold text-black dark:text-white'>
          Periodic Table of Elements
        </h1>
        <div className='grid grid-cols-4 gap-4'>
          {elements.map((element) => (
            <div
              key={element.symbol}
              className='flex flex-col items-center rounded-lg  p-4 shadow-md dark:bg-blue-900'
              style={{backgroundColor: `#${element.cpkHexColor}`}}>
              <div
                className='flex h-16 w-16 items-center justify-center rounded-full '
                style={{backgroundColor: `#${element.cpkHexColor}`}}>
                <span className='font-bold text-cyan-700 '>
                  {element.symbol}
                </span>
              </div>
              <h2 className='my-2 text-lg font-bold'>{element.name}</h2>
              <p>
                Atomic Number:{' '}
                <span className='font-bold'>{element.atomicNumber}</span>
              </p>
              <p>
                Atomic Mass:{' '}
                <span className='font-bold'>{element.atomicMass}</span>
              </p>
              <p>
                Melting Point:{' '}
                <span className='font-bold'>{element.meltingPoint}</span>
              </p>
              <p>
                Boiling Point:{' '}
                <span className='font-bold'>{element.boilingPoint}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
