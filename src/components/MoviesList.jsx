import React from 'react'
import MovieCard from './MovieCard'

const MoviesList = ({ title, movies }) => {

    return (
        <div className='px-4 bg-black'>
            <h1 className='text-2xl py-2 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll border border-red-500'>
                <div className='flex'>
                    {movies?.map(movie =>
                        <MovieCard
                            key={movie.id}
                            posterPath={movie?.poster_path}
                        />
                    )}

                </div>
            </div>

        </div>
    )
}

export default MoviesList