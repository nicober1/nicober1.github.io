import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useBaseUrl from '@docusaurus/useBaseUrl'

function CryptoPrices() {
  const [data, setData] = useState([])
 var url = useBaseUrl('/data/crypto.json')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-center text-4xl font-bold'>Crypto Prices</h1>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-6'>
        {data.map((coin) => (
          <div key={coin.id} className='overflow-hidden rounded-lg bg-gray-200 shadow-md dark:bg-gray-600'>
            <div className='p-4'>
              <h2 className='mb-4 text-2xl font-bold'>{coin.name}</h2>
              <p className='mb-2 font-bold text-cyan-600'>{coin.symbol}</p>
              <p className='mb-4 text-lg font-bold'>${parseFloat(coin.priceUsd).toFixed(2)}</p>
              <p className='mb-2 '>Market Cap</p>
              <p className='mb-4 font-bold'>${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
              <p className='mb-2 '>24h Change</p>
              <p className={`font-bold ${parseFloat(coin.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500'}`}>{parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CryptoPrices
