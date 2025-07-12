import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: 'gpt',
    initialState:{
        showGptSearch: false,
        movieResults:null,
        movieNames:null
    },
    reducers:{
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addMovieResult: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    }
});

export const { toggleGptSearchView, addMovieResult } = gptSlice.actions;

export default gptSlice.reducer;