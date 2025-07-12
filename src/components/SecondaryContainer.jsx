import React from 'react'
import MoviesList from './MoviesList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies);

  return (
      <div className='bg-black '>
        <div className='-mt-10 relative pl-12 z-24'>
          <MoviesList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MoviesList title={"Popular"} movies={movies?.popularMovies} />
          <MoviesList title={"Top Rated"} movies={movies?.topRatedMovies} />
          <MoviesList title={"Up Coming"} movies={movies?.upComingMovies} />
        </div>
      </div>

  )
}

export default SecondaryContainer