import React, {useState, useEffect} from 'react'
import axios from '@site/src/components/axios'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import HeaderTypeWriter from '@site/src/components/HeaderTypeWriter'

export default function App() {
  var url = useBaseUrl('/data/nse/nifty50.json')

  const [data, setData] = useState([])
  const [resp, setResp] = useState([])
  const [adv, setAdv] = useState([])
  const [dec, setDec] = useState([])
  const [sortOption, setSortOption] = useState('symbol')

  useEffect(() => {
    axios
      .get(url, {withCredentials: true})
      .then((response) => {
        setData(response.data.data)
        setResp(response.data)
        setAdv(response.data.advance.advances)
        setDec(response.data.advance.declines)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value)
  }

  const sortData = (data) => {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
      switch (sortOption) {
        case 'symbol':
          return a.symbol.localeCompare(b.symbol)
        case 'change':
          return b.change - a.change
        case '%change':
          return b.pChange - a.pChange
        default:
          return 0
      }
    })
    return sortedData
  }

  return (
    <Layout noFooter>
      <div className='container mx-auto mt-10 text-center  dark:text-white'>
        <HeaderTypeWriter>{resp.name}</HeaderTypeWriter>
        <h2>{`Advances: ${adv}  Declines: ${dec}`}</h2>
        <h3>{`Time:  ${resp.timestamp}`}</h3>
      </div>
      <div className='container mx-auto mt-5 text-center dark:text-white'>
        <label htmlFor='sort-option'>Sort by:</label>
        <select id='sort-option' value={sortOption} onChange={handleSortOptionChange}>
          <option value='symbol'>Symbol</option>
          <option value='change'>Change</option>
          <option value='%change'>%Change</option>
        </select>
      </div>
      <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {sortData(data).map((item) => (
          <div
            key={item.symbol}
            className={`${item.change > 0 ? 'bg-green-800' : 'bg-red-800'} mb-5 rounded-md p-4 text-white`}
          >
            <h2 className='mb-2 text-base font-bold'>{item.symbol}</h2>
            <div className='text-xs'>
              {item.meta ? <p>{item.meta.companyName}</p> : null}
              {item.meta ? <p>{item.meta.industry}</p> : null}
            </div>

            <div className='mt-10 flex gap-12 text-xs'>
              <div>
                <div className='flex gap-2'>
                  <p className=''>Last Price: </p>
                  <p className='font-bold'>{item.lastPrice}</p>
                </div>
                <div className='flex gap-2'>
                  <p className=''>% Change: </p>
                  <p className='font-bold'>{item.pChange}</p>
                </div>
                <div className='flex gap-2'>
                  <p className=''>Change: </p>
                  <p className={`font-bold ${item.change > 0 ? 'text-green-200' : 'text-red-200'}`}>{item.change}</p>
                </div>
              </div>
              <div>
                <div className='flex gap-2'>
                  <p className=''>Day Low: </p>
                  <p className='font-bold'>{item.dayLow}</p>
                </div>
                <div className='flex gap-2'>
                  <p className=''>Day High: </p>
                  <p className='font-bold'>{item.dayHigh}</p>
                </div>
                <div className='flex gap-2'>
                  <p className=''>Open: </p>
                  <p className='font-bold'>{item.open}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
