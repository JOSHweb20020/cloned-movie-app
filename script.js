const API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d48f331a6b75ea11ef5379196afb31c5&page1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL='https://api.themoviedb.org/3/search/movie?api_key=d48f331a6b75ea11ef5379196afb31c5&query="';
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('Search')

//get initial data

getMovies(API_URL) 

async function getMovies(url){
    const res = await fetch(url)
    const data = res.json()

    showMovies(data.results)
}



function showMovies(movies){
    main.innerHTML = '';
  

    movies.forEach((movie) => {
        console.log(movie)

        const movieEl = document.createElement('div')
        movieEl.classList.add( 'movie')

        movieEl.innerHTML = `
            <div class="movie">
            <img src="${IMG_PATH + poster_path}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVote(vote_average)}">${vote-avarage}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}
            
            </div>
        
        </div>
        `

        main.appendChild(movieEl)
    })

}

function getVote(vote){
    if (vote >= 8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)
    }else{
        windows.location.reload()
    }
})

