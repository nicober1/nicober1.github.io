import React from 'react'
import data from '/data/hero.json'

export default function App() {
  return (
    // Use grid-cols-3 to create a 3-column grid
    <div className='grid min-h-screen grid-cols-3 gap-4 bg-gray-100'>
      {data.map((hero) => (
        // Use the Hero component and pass the hero object as a prop
        <Hero key={hero.id} hero={hero} />
      ))}
    </div>
  )
}

// Wrap the component with React.memo
const Hero = React.memo(function Hero({hero}) {
  return (
    // Move the JSX for each hero inside this component
    <div className='overflow-hidden rounded-lg bg-white p-4 shadow-lg'>
      <img src={hero.image.url} alt={hero.name} className='h-48 w-full object-cover' />
      <div className='p-4'>
        <h2 className='mb-2 text-xl font-bold text-gray-900'>{hero.name}</h2>
        <div className='mb-4'>
          <h3 className='mb-2 text-lg font-bold text-gray-600'>Powerstats:</h3>
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
          <h3 className='mb-2 text-lg font-bold text-gray-600'>Biography:</h3>
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
      // End of JSX for each hero
    </div>
  )
})
