import React, {useState, useEffect} from 'react'
import axios from 'axios'

const fetchTopMovies = async () => {
  try {
    const response = await axios.get('https://imdb-api.com/en/API/Top250Movies/k_zp804522')
    return response.data.items
  } catch (error) {
    console.error(error)
    return []
  }
}

const Movie = ({fullTitle, title, rank, imDbRating, image, crew}) => (
  <div className='movie m-4 transform overflow-hidden rounded-lg bg-white p-2 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'>
    <img
      src={image}
      alt={title}
      className='w-full items-center object-cover'
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    />
    <div className='movie-info  text-center font-bold text-gray-800'>
      <h3 className='text-lg font-semibold leading-snug text-purple-500 md:text-xl md:leading-normal'>{fullTitle}</h3>
      <p className=' '>Crew: {crew}</p>
      <p className=' '>Rank: {rank}</p>
      <p className=''>Rating: {imDbRating}</p>
    </div>
  </div>
)

const MovieList = ({movies}) => (
  <div className='movie-list grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    {movies.map((movie) => (
      <Movie key={movie.id} {...movie} />
    ))}
  </div>
)

const TopMovies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchTopMovies().then(setMovies)
  }, [])

  return (
    <div className='top-movies container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-center text-4xl font-bold'>Top 250 Movies from IMDb</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>Loading...</p>}
    </div>
  )
}

export default TopMovies
