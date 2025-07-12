import React from 'react'
import { useSelector } from 'react-redux'
import MoviesList from './MoviesList';

const GptMovieSuggestion = () => {

    const gpt = useSelector(store => store.gpt);
    const { movieResults, movieNames } = gpt;

    if (!movieNames) return null;

    return (
        <div className='text-white p-4 m-4 opacity-80'>
            {movieNames.map((movieName, index) => (
                <MoviesList
                    key={movieName}
                    title={movieName}
                    movies={movieResults[index]}
                />))}

        </div>
    )
}

export default GptMovieSuggestion