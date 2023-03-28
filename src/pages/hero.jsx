import React from 'react'
import data from '/data/hero.json'
import Layout from '@theme/Layout'

export default function App() {
  return (
    <Layout noFooter title='Superheros'>
      <main className='container mx-auto p-4'>
        <h1 className='text-shadow-lg text-6rem rounded-lg bg-gradient-to-br from-green-600 via-blue-600 to-purple-600  p-4 text-center font-bold text-white'>SuperHeros and SuperHeroines</h1>

        <div className='grid min-h-screen grid-cols-3 gap-4 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900'>
          {data.map((hero) => (
            <Hero key={hero.id} hero={hero} />
          ))}
        </div>
      </main>
    </Layout>
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
