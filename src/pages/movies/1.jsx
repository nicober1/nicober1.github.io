import React, {useState, useEffect} from 'react'
import axios from 'axios'

// A function to fetch the top movies from imdb using their API
const fetchTopMovies = async () => {
  try {
    const response = await axios.get('https://imdb-api.com/en/API/Top250Movies/k_zp804522') // Replace k_12345678 with your own API key
    return response.data.items
  } catch (error) {
    console.error(error)
    return []
  }
}

// A component to display a single movie
const Movie = ({title, year, rank, rating, image}) => {
  return (
    <div className='movie'>
      <img src={image} alt={title} />
      <div className='movie-info'>
        <h3>{title}</h3>
        <p>{year}</p>
        <p>Rank: {rank}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  )
}

// A component to display a list of movies
const MovieList = ({movies}) => {
  return (
    <div className='movie-list'>
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  )
}

// A component to render the top movies from imdb
const TopMovies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // Fetch the top movies when the component mounts
    fetchTopMovies().then((data) => setMovies(data))
  }, [])

  return (
    <div className='top-movies'>
      <h1>Top Movies from IMDb</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>Loading...</p>}
    </div>
  )
}

export default TopMovies
