import Movie from './Components/Movie.js';
import keys from "./keys.js";
import SearchMovie from "./Components/SearchMovie.js";
// import searchMovie from "./Components/SearchMovie";
export async function getMovies(movie){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${keys.movieKey}&language=en-US&page=1`
    let options = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try{
        let response = await fetch( url, options)
        let data = await response.json()
        // console.log(data)
        return data.results
    }catch (e) {
        console.log(e)
    }
}
export async function getFavorites(movie){
    let url = `http://localhost:3000/movies/`
    let options = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try{
        let response = await fetch( url, options)
        let data = await response.json()
        // console.log(data)
        return data
    }catch (e) {
        console.log(e)
    }
}
export async function displayFavorites(){
    let movieArray = await getFavorites();
    movieArray.forEach(function(movie){
        let movieList = document.querySelector('.content');
        new Movie(movie, movieList);
    });
    // console.log(movieArray)
}
export async function displayMovies(){
    let movieArray = await getMovies();
    movieArray.forEach(function(movie){
        let movieList = document.querySelector('.content');
        new Movie(movie, movieList);
    });
    // console.log(movieArray)
}
export const addMovie = async (movie) => {
    try {
        let url = 'http://localhost:3000/movies'
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}
export const deleteFavorite = async (id) => {
    try {
        let url = `http://localhost:3000/movies/${id}`;
        let options = {
            method: "DELETE"

        }
        let response = await fetch(url, options);
        let data = await response.json();
    } catch(error){
        console.log(error);
    }
}

export const editFavorite = async (id, edits) => {
    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(edits),
        });
        let data = await response.json()
        return data
    } catch(error){
        console.log(error);
    }
}
export const edit = async (id, movieEdits) => {

        let response = await editFavorite(id, movieEdits);
}
export const search = async (input)=>{
    try{
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${keys.movieKey}&query=${input}&language=en-US&page=1&include_adult=false`
        let response = await fetch(url)
        let data = await response.json()
        console.log(data)
        let movieList = document.querySelector('.search-content');

        movieList.innerHTML = '';

        if (input === '' || input.length <= 1) {
            return;
        }
        if (input.toLowerCase() === 'the' || input.toLowerCase() === 'the ') {
            return;
        }
        data.results.forEach(movie => new SearchMovie(movie, movieList));
    }catch(e){
        console.log(e)
    }
}

// export const setSearchContent= async ()=>{
//     let searchContent = await search()
//     console.log(searchContent)
// }

export function debounce(func, delay) {
    let timer;
    return function(...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
}