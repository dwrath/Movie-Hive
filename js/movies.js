import {
    displayMovies,
    addMovie,
    deleteFavorite,
    search,
    debounce,
    displayFavorites,
    edit
} from './movie-api.js';
const carousel = document.querySelector('.carousel');
const rightButton = document.querySelector('#left');
const leftButton = document.querySelector('#right');
const addMoviePopout = document.querySelector('#add-movie')
const customMoviePopout = document.querySelector('#add-custom-movie')
let selectedIndex = 0;
let cellCount = 9;

function rotateCarousel() {
    let angle = selectedIndex / cellCount * -360;
    carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
}
rightButton.addEventListener('click', () => {
    selectedIndex--;
    rotateCarousel();
});

leftButton.addEventListener('click', () => {
    selectedIndex++;
    rotateCarousel();

});
customMoviePopout.addEventListener('click', ()=>{
    document.querySelector('.custom-overlay').classList.toggle(('show'))
} )
addMoviePopout.addEventListener('click', ()=>{
    document.querySelector('.overlay').classList.toggle('show');
});

document.querySelector('#search').addEventListener('input', debounce( async (e) => {
    let userInput = e.target.value
    console.log(userInput)
    await search(userInput)

}, 1000));

document.querySelector('.cancel').addEventListener('click', function(event) {
    document.querySelector('.custom-overlay').classList.toggle('show');
});
document.querySelector('.search-cancel').addEventListener('click', function(event) {
    document.querySelector('.overlay').classList.toggle('show');
});
document.querySelector('.cancelEditBtn').addEventListener('click', function(event) {
    let form = document.getElementById('edit-form');
    form.style.display = 'none';
});

document.querySelector('#submitBtn').addEventListener('click',async(e) => {
    const form = document.forms['myForm'];
    //const title = form.elements['title'].value;
    const title = document.querySelector('#title').value
    const genre = document.querySelector('#genre').value
    const rating = document.querySelector('#ratings').value
    const poster_path = document.querySelector('#director').value

    let movie = {
        title,genre,rating,poster_path
    }
    await addMovie(movie)
    document.querySelector('.content').innerHTML = ''
    await displayFavorites()
});



(async ()=>{
    await displayFavorites()
    document.querySelector('.content').style = 'display: flex'
    document.querySelector('#loading-icon').style = 'display:none'

})()


