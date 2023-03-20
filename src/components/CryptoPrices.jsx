import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CryptoPrices() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets?limit=1000')
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
      <div className='grid grid-cols-6 gap-4 md:grid-cols-2 lg:grid-cols-6'>
        {data.map((coin) => (
          <div key={coin.id} className='overflow-hidden rounded-lg dark:bg-blue-800 shadow-md'>
            <div className='p-4'>
              <h2 className='mb-4 text-2xl font-bold'>{coin.name}</h2>
              <p className='mb-2 '>{coin.symbol}</p>
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
