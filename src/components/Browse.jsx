import React, { use, useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './Maincontainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpComingMovies';

const Browse = () => {

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse