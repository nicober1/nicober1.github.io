import React from 'react'
import data from '/data/hero.json'
export default function App() {
  return (
    <div className='grid min-h-screen grid-cols-3 gap-4 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900'>
      {data.map((hero) => (
        <Hero key={hero.id} hero={hero} />
      ))}
    </div>
  )
}
const Hero = React.memo(function Hero({hero}) {
  return (
    <div className='transform rounded-lg border-4 border-white bg-white/50 p-4 shadow-xl transition-transform duration-300 ease-in-out hover:scale-105'>
      <img src={hero.image.url} alt={hero.name} className='w-full rounded object-cover' />
      <div className='p-4'>
        // Use text-white text-shadow-lg font-bold to style the text
        <h2 className='text-shadow-lg mb-2 text-xl font-bold text-white'>{hero.name}</h2>
        <div className='mb-4'>
          <h3 className='text-shadow-lg mb-2 text-lg font-bold text-white'>Powerstats:</h3>
          <ul className='list-disc pl-5'>
            {Object.entries(hero.powerstats).map(([stat, value]) => (
              <li key={stat}>
                <span className='font-bold'>{stat}: </span>
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
          </ul>
        </div>
      </div>
    </div>
  )
})
