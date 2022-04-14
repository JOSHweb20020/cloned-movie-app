const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d48f331a6b75ea11ef5379196afb31c5&page1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=d48f331a6b75ea11ef5379196afb31c5&query="';
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('Search')

//get initial data

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}



function showMovies(movies) {
    main.innerHTML = '';


    movies.forEach((movie) => {
        const movieEl = document.createElement('div');


        movieEl.innerHTML = `
            <div class="movie">
            <img src="${IMG_PATH + movie.poster_path}">
            
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getVote(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${movie.overview}
            </div>
        </div>
        `

        main.appendChild(movieEl)
    })

}

function getVote(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
    } else {
        windows.location.reload()
    }
})

