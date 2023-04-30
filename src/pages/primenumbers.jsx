import {useState} from 'react'
import React from 'react'
import Layout from '@theme/Layout'

export default function Home() {
  const [limit, setLimit] = useState(100)
  const [primes, setPrimes] = useState([])

  const isPrime = (n) => {
    if (n <= 1) return false
    if (n <= 3) return true
    if (n % 2 === 0 || n % 3 === 0) return false
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false
    }
    return true
  }

  const generatePrimes = () => {
    const primeNumbers = []
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) primeNumbers.push(i)
    }
    setPrimes(primeNumbers)
  }

  return (
    <Layout noFooter wrapperClassName='live-page'>
      <div className='flex flex-col items-center'>
        <h2 className='mb-4 text-2xl font-bold'>Prime Numbers</h2>
        <label htmlFor='limit' className='mr-4'>
          Limit:
        </label>
        <input
          id='limit'
          type='number'
          className='mb-4 rounded-md border p-2'
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
        />
        <button
          className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
          onClick={generatePrimes}
        >
          Generate
        </button>
      </div>
      <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {primes.map((color) => {
          return (
            <div
              key={color}
              className='overflow-hidden rounded-full text-center'
              style={{backgroundColor: 'purple', padding: '15px'}}
            >
              <h3 className='mx-auto my-auto text-xl font-bold uppercase text-white'>{color}</h3>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
