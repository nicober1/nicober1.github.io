import React from 'react'
import data from '/data/hero.json'
import Loading from '@site/src/pages/1Loading'


export default function App() {
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    document.title = `Search for ${searchTerm}`
  }, [searchTerm])

  const handleChange = React.useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const filteredData = React.useMemo(() => {
    return data.filter((hero) => hero.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  return (
    <Loading>

      <main className='container mx-auto p-4'>
        <h1 className='text-shadow-lg text-6rem rounded-lg bg-gradient-to-br from-green-600 via-blue-600 to-purple-600  p-4 text-center font-bold text-white'>
          SuperHeros and SuperHeroines
        </h1>
        <div className='my-4 flex items-center justify-center'>
          <div className='relative w-full max-w-md'>
            <input
              className='h-10 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 text-black placeholder-black shadow-sm focus:border-indigo-500 focus:outline-none'
              type='text'
              placeholder='Search by Superhero(ine) Name...'
              value={searchTerm}
              onChange={handleChange}
            />
            <span className='absolute top-[50%] left-[0.5rem] -translate-y-[50%] transform text-gray-400'>
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-5.172-5.172m2.828-2.828a4.5 4.5 0 10-9.9-.001 4.5 4.5 0 009.9.001z'
                />
              </svg>
            </span>
            <button
              className='absolute top-[50%] right-[0.5rem] -translate-y-[50%] transform rounded-full bg-indigo-500 text-white shadow-sm hover:bg-indigo-600'
              type='submit'>
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </button>
          </div>
        </div>
        <div className='grid min-h-screen grid-cols-3 gap-4 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 sm:grid-cols-1'>
          {filteredData.map((hero) => (
            <Hero key={hero.id} hero={hero} />
          ))}
        </div>
      </main>
    </Loading>
  )
}
const Hero = React.memo(function Hero({hero}) {
  return (
    <div className='transform rounded-lg border-4 border-white bg-white/50 p-4 shadow-xl transition-transform duration-300 ease-in-out hover:scale-105'>
      <img src={hero.image.url} alt={hero.name} className='w-full rounded-t-lg object-cover' />
      <div className='p-4'>
        <h2 className='text-shadow-lg mb-2 text-xl font-bold text-white'>{hero.name}</h2>
        <div className='mb-4'>
          <h3 className='text-shadow-lg mb-2 text-lg font-bold text-white'>Powerstats:</h3>
          <ul className='list-disc pl-5'>
            {Object.entries(hero.powerstats).map(([stat, value]) => (
              <li key={stat}>
                <span className='font-bold capitalize'>{stat}: </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-4'>
          <h3 className='text-shadow-lg mb-2 text-lg font-bold text-white'>Biography:</h3>
          <ul className='list-disc pl-5'>
            <li>
              <span className='font-bold'>Full Name: </span>
              <span>{hero.biography['full-name']}</span>
            </li>
            <li>
              <span className='font-bold'>Alter Egos: </span>
              <span>{hero.biography['alter-egos']}</span>
            </li>
            <li>
              <span className='font-bold'>Aliases: </span>
              <span>{hero.biography.aliases.join(', ')}</span>
            </li>
            <li>
              <span className='font-bold'>Place of Birth: </span>
              <span>{hero.biography['place-of-birth']}</span>
            </li>
            <li>
              <span className='font-bold'>First Appearance: </span>
              <span>{hero.biography['first-appearance']}</span>
            </li>
            <li>
              <span className='font-bold'>Publisher: </span>
              <span>{hero.biography['publisher']}</span>
            </li>
            <li>
              <span className='font-bold'>Alignment: </span>
              <span>{hero.biography['alignment']}</span>
            </li>
          </ul>
        </div>
        <div className='mb-4'>
          <h3 className='text-shadow-lg mb-2 text-lg font-bold text-white'>Appearance:</h3>
          <ul className='list-disc pl-5'>
            {Object.entries(hero.appearance).map(([attr, value]) => (
              <li key={attr}>
                <span className='font-bold capitalize'>{attr}: </span>
                {Array.isArray(value) ? value.join(', ') : value}
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-4'>
          <h3 className='text-shadow-lg mb-2 text-lg font-bold text-white'>Work:</h3>
          <ul className='list-disc pl-5'>
            {Object.entries(hero.work).map(([attr, value]) => (
              <li key={attr}>
                <span className='font-bold capitalize'>{attr}: </span>
                {Array.isArray(value) ? value.join(', ') : value}
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-4'>
          <h3 className='text-shadow-lg mb-2 text-lg font-bold text-white'>Connections:</h3>
          <ul className='list-disc pl-5'>
            {Object.entries(hero.connections).map(([attr, value]) => (
              <li key={attr}>
                <span className='font-bold capitalize'>{attr}: </span>
                {Array.isArray(value) ? value.join(', ') : value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
})
