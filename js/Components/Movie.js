import {deleteFavorite, editFavorite, edit, displayMovies, displayFavorites} from "../movie-api.js";
class Movie {
    constructor(data, target){
        this.poster_path= data.poster_path
        this.title = data.title;
        this.vote_average = data.vote_average;
        this.id=data.id
        this.genres = data.genres
        this.element = this.render(target);
    }
    render(target){
        let moviesNode = document.createElement('div');
        moviesNode.classList.add('movie-card');
        let html = `
              <div class="catalog-img-wrapper">
              ${this.poster_path ? `<img src="https://image.tmdb.org/t/p/w500/${this.poster_path}" />` : `<img src='../../images/no-image.jpeg'/>`}
              </div>
              <div class="card-bottom">
                <h2 class="movie-title">${this.title}</h2>
                ${this.vote_average ?  `<p>Rating: ${this.vote_average}</p>`: `<p>Genres: ${this.genres}</p>`}
                <button class="edit-movie">Edit</button>
                <button class="movie-delete">Delete</button>
              </div>
        `;
        moviesNode.innerHTML = html;
        let editButton = moviesNode.querySelector('.edit-movie')
        editButton.addEventListener('click', async function(){
            let form = document.getElementById('edit-form');
            form.style.display = 'block';
            document.querySelector('#submitEditBtn').addEventListener('click',async(e) => {
                const form = document.forms['myForm'];
                //const title = form.elements['title'].value;
                const title = document.querySelector('#edit-title').value
                const genre = document.querySelector('#edit-genre').value
                const rating = document.querySelector('#edit-ratings').value
                const image = document.querySelector('#edit-director').value
                let movieEdits = {}
                if(title != ''){
                    movieEdits['title'] = title;
                }
                if(genre != ''){
                    movieEdits[genre] = genre;
                }
                if(rating != ''){
                    movieEdits[vote_average] = rating;
                }
                if(image != ''){
                    movieEdits[image] = image
                }
                // let movieEdits = {
                //     title,genre,vote_average:parseFloat(rating),image
                // }
                await edit(this.id, movieEdits)
                document.querySelector('.content').innerHTML = ''
                document.getElementById('edit-form').style.display ='none'
                await displayFavorites()
            });

        }.bind(this));

        let deleteButton = moviesNode.querySelector('.movie-delete');
        deleteButton.addEventListener('click', async function(){
             await deleteFavorite(this.id);
            moviesNode.remove();
        }.bind(this));
        target.appendChild(moviesNode);
        return moviesNode;

    }




    movieClick(){

    }
}

export default Movie;