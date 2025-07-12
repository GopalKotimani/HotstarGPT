import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/moviesSlice";

const useUpComingMovies = () => {

    const dispatch = useDispatch();

    const getUpComingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', API_OPTIONS);
        const json = await data.json();

        dispatch(addUpComingMovies(json.results));
        
    }

    useEffect(() =>{
        getUpComingMovies();
    }, []);


}

export default useUpComingMovies;