import React from 'react'
import data from '/data/hero.json'

export default function App() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      {data.map((hero) => (
        <div key={hero.id} className='w-full p-4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
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
                  <li>
                    <span className='font-bold'>First Appearance: </span>
                    <span>{hero.biography['first-appearance']}</span>
                  </li>
                  <li>
                    <span className='font-bold'>Publisher: </span>
                    <span>{hero.biography.publisher}</span>
                  </li>
                  <li>
                    <span className='font-bold'>Alignment: </span>
                    <span>{hero.biography.alignment}</span>
                  </li>
                </ul>
              </div>
              <div className='mb-4'>
                <h3 className='mb-2 text-lg font-bold text-gray-600'>Appearance:</h3>
                <ul className='list-disc pl-5'>
                  <li>
                    <span className='font-bold'>Gender: </span>
                    <span>{hero.appearance.gender}</span>
                  </li>
                  <li>
                    <span className='font-bold'>Race: </span>
                    <span>{hero.appearance.race}</span>
                  </li>
                  <li>
                    <span className='font-bold'>Height: </span>
                    <span>{hero.appearance.height[0]}</span>
                  </li>
                  <li>
                    <span className='font-bold'>Weight: </span>
                    <span>{hero.appearance.weight[0]}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
