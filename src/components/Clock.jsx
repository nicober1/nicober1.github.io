import React, {useState, useEffect} from 'react'
import moment from 'moment-timezone'
import 'moment/locale/en-gb'

const Clock = () => {
  const [time, setTime] = useState(moment())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='mt-10 container  grid  gap-4 md:grid-cols-2 lg:grid-cols-6'>
      {moment.tz
        .names()
        .reverse()
        .map((city) => (
          <div
            key={city}
            className='rounded bg-blue-200 p-4 shadow-md dark:bg-blue-900'>
            <div className='text-lg font-medium text-cyan-800 dark:text-cyan-200'>
              {city}
            </div>
            <div className='text-4xl font-bold'>
              {time.tz(city).format('HH:mm:ss')}
            </div>
            <div className='text-sm text-cyan-900  dark:text-cyan-200'>
              {time.tz(city).format('dddd, D MMMM YYYY')}
            </div>
            <div className='text-sm text-cyan-900 dark:text-cyan-200'>
              {time.tz(city).format('ha z')}
            </div>
          </div>
        ))}
    </div>
  )
}


export default Clock
