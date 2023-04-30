import React, {useState, useEffect} from 'react'
import Layout from '@theme/Layout'
import axios from 'axios'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function NobelPrizeWinners() {
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const url = useBaseUrl('/data/v1prizes.json')

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(url)
        const {prizes} = response.data
        setWinners(prizes)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError('Error fetching prize winners')
        setLoading(false)
      }
    }
    fetchWinners()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Layout noFooter wrapperClassName='countries-page'>
      <div className='container mx-auto mt-4'>
        <h1 className='mb-4 text-4xl font-bold'>Nobel Prize Winners</h1>
        {winners.length === 0 && <p>No winners found</p>}
        <ul>
          {winners.map((prize, index) => (
            <li key={index} className='mb-4 rounded-lg p-4 shadow-md'>
              <h2 className='mb-2 text-2xl font-bold uppercase'>{prize.category}</h2>
              <p className='mb-2 text-lg'>Year: {prize.year}</p>
              {prize.laureates && prize.laureates.length > 0 && (
                <ul>
                  {prize.laureates.map((laureate, index) => (
                    <li key={`${index}-${laureate.id}`} className='mb-2'>
                      {laureate.firstname} {laureate.surname} - {laureate.motivation}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
