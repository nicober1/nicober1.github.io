import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LRUCache from 'lru-cache'
import tw from 'tailwind-styled-components'

const Wrapper = tw.div`
  p-4
  rounded-md
`

const Title = tw.h2`
  text-lg
  font-semibold
  mb-2
`

const Table = tw.table`
  w-full
  border-collapse
`

const TableRow = tw.tr`
  border-b
  border-gray-200
  last:border-b-0
`

const TableCell = tw.td`
  py-2
  px-4
`

const TickerSymbol = tw.span`
  font-semibold
`

const StockPrice = tw.span`
  font-bold
`

const StockChange = tw.span`
  ml-2
  px-2
  py-1
  rounded
  text-white
  ${(props) => (props.isPositive ? 'bg-green-500' : 'bg-red-500')}
`

const options = {
  max: 500,

  maxSize: 5000,
  sizeCalculation: (value, key) => {
    return 1
  },

  
  dispose: (value, key) => {
    freeFromMemoryOrWhatever(value)
  },

  ttl: 1000 * 60 * 480,

  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  fetchMethod: async (key, staleValue, {options, signal, context}) => {},
}

const StockList = () => {
  const [stockList, setStockList] = useState([])
  const cache = new LRUCache(options)

  useEffect(() => {
    const fetchStockList = async () => {
      const cachedData = cache.get('stockList')
      if (cachedData) {
        setStockList(cachedData)
      } else {
        const response = await axios.get(`https://api.polygon.io/v3/reference/tickers?marketcap.more-than=1000000000&sort=marketcap&order=desc&apiKey=ffw6OiYaDGKT2FVLZoGcKJIwR0zAMd3I`)
        //const response = await axios.get(`https://api.polygon.io/v3/reference/tickers?marketcap.more-than=1000000000&sort=marketcap&order=desc`)
        const data = response.data.results
        cache.set('stockList', data) 
        setStockList(data)
      }
    }
    fetchStockList()
  }, [])

  return (
    <Wrapper>
      <Title>Largest Companies by Market Cap</Title>
      <Table>
        <tbody>
          {stockList.map((stockData) => (
            <TableRow key={stockData.ticker}>
              <TableCell>{stockData.name}</TableCell>
              <TableCell>
                <StockPrice>{stockData.lastTradePrice.toFixed(2)}</StockPrice>
                <StockChange isPositive={stockData.percentChange >= 0}>{stockData.percentChange.toFixed(2)}%</StockChange>
              </TableCell>
              <TableCell>
                <TickerSymbol>{stockData.ticker}</TickerSymbol>
              </TableCell>
              <TableCell>{stockData.marketCap.toLocaleString()}</TableCell>
              <TableCell>{stockData.exchange}</TableCell>
              <TableCell>{stockData.sector}</TableCell>
              <TableCell>{stockData.industry}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}

export default StockList
