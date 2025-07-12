import React, { useRef } from 'react'
import { API_OPTIONS, BACKGROUND_IMAGE, GEMENI_API_KEY } from '../utils/constants'
import lang from '../utils/langConstants'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleGenAI } from "@google/genai";
import { addMovieResult } from '../utils/gptSlice';
// import openai from '../utils/openGeminiAI';


const GptSearchBar = () => {
    const searchTest = useRef();
    const langKey = useSelector(store => store.config.lang);
    const dispatch = useDispatch();

    const searchMovieGpt = async (movie) => {
        const resopnse = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS)
        const json = await resopnse.json();
        return json.results;
    }

    const YOUR_API_KEY = GEMENI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: YOUR_API_KEY });
    const handleGptSearchClick = async () => {
        // console.log(searchTest.current.value);
        const query = "Act as a Movie recomondation syste and suggest some movies for the query " + searchTest.current.value + ". only give me names of 5 movies, comma seperated like the example result fiven ahead. Example Result:Sholey, Done, The viallin, Hebuli, RRR";
        try {
            const resopnse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: query,
            });
            const gptResult = resopnse?.candidates[0]?.content?.parts[0]?.text.split(","); // Access the text correctly
            console.log(gptResult);

            const promiseArray = gptResult.map((movie) => searchMovieGpt(movie));
            const tmdbResults = await Promise.all(promiseArray);
            console.log(tmdbResults);
            dispatch(addMovieResult({movieNames: gptResult, movieResults:tmdbResults}))


        } catch (error) {
            console.error("Error during GPT search:", error);
            // Handle error, e.g., set an error state
        }
    }

    return (<div>
        <div className='fixed -z-10'>
            <img
                src={BACKGROUND_IMAGE}
                alt="Browse Background"
            />
        </div>
        <div className='pt-[10%] flex justify-center'>
            <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchTest}
                    type='text'
                    className='p-4 m-4 bg-white col-span-9'
                    placeholder={lang[langKey].searchPlaceHolder}
                />
                <button
                    className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4'
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    </div>
    )
}

export default GptSearchBar;