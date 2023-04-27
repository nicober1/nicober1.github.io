import React, {useState, useEffect} from 'react'
import axios from '@site/src/components/axios'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function App() {
  var url = useBaseUrl('/data/nse/fo.json')

  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(url, {withCredentials: true})
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {data.map((item) => (
        <div
          key={item.symbol}
          className={`${item.change > 0 ? 'bg-green-800' : 'bg-red-800'} mb-5 rounded-md p-4 text-white`}>
          <h2 className='mb-2 text-base font-bold'>{item.symbol}</h2>
          <p className='mb-2 text-xs'>
            {item.meta.companyName} {item.meta.industry}
          </p>
          <div className='mt-10 text-xs'>
            <div className='flex gap-4'>
              <p className=''>Last Price: </p>
              <p className='font-bold'>{item.lastPrice}</p>
            </div>
            <div className='flex gap-4'>
              <p className=''>% Change: </p>
              <p className='font-bold'>{item.pChange}</p>
            </div>
            <div className='flex gap-4'>
              <p className=''>Change: </p>
              <p className={`font-bold ${item.change > 0 ? 'text-green-200' : 'text-red-200'}`}>{item.change}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
