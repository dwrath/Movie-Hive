import {addMovie, displayFavorites} from "../movie-api.js";

class SearchMovie {
    constructor(data, target) {
        this.poster_path = data.poster_path
        this.title = data.title;
        this.vote_average = data.vote_average;
        this.genres = data.genres
        this.element = this.render(target);
    }

    render(target) {
        let moviesNode = document.createElement('div');
        moviesNode.classList.add('movie-card');
        let html = `
              <div class="catalog-img-wrapper">
              ${this.poster_path ? `<img src="https://image.tmdb.org/t/p/w500/${this.poster_path}" />` : this.title}
              </div>
              <div class="card-bottom">
                <h2>${this.title}</h2>
                <p>Rating: ${this.vote_average}</p>
                <button class="movie-add">Favorites</button>
              </div>
        `;
        moviesNode.innerHTML = html;
        let pushMovie = moviesNode.querySelector('.movie-add');
        pushMovie.addEventListener('click', async function () {
            await addMovie({
                poster_path: `https://image.tmdb.org/t/p/w500/${this.poster_path}`,
                title:this.title,
                vote_average: this.vote_average
            });
            document.querySelector('.content').innerHTML = ''
            document.getElementById('edit-form').style.display ='none'
            await displayFavorites()
        }.bind(this));

        target.appendChild(moviesNode);
        return moviesNode;

    }
}
export default SearchMovie
