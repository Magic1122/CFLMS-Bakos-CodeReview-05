// Loads the Movies from our JSON file

const loadMovies = async () => {
    let movies = [] 
    await $.getJSON('./data/movie-data.json', data => movies = data.results)
    return movies
}

// Generate the DOM structure for a movie

const generateMovieDOM = (movie, shortenOverview) => {
    const overview = shortenOverview ? `${movie.overview.substring(0, 38)}...` : movie.overview
    /* Creating NODES */
    const movieElementHTML = 
                    `<div class='main-movies-img-container' id="main-movies-img-container">
                        <img class='main-movies-img-container__img' src='${movie.img}'>
                    </div>
                    <div class="main-movies-title-likes-container" id="main-movies-title-likes-container">
                        <div class='main-movies-title-container'>
                            <p class='main-movies-title-container__title'>${movie.title}</p>
                            <p class='main-movies-title-container__description' movieId="${movie.id}">${overview}</p>
                        </div>
                        <div class='main-movies-likes-container'>
                            <p class='main-movies-likes-container__text'><span movieId="${movie.id}" class="like-button">Like 👍</span><span>${movie.likes}</span></p>
                        </div>
                    </div>`
    
    return movieElementHTML
}

//Sort your movies by one of three ways

const sortMovies = (movies, sortBy) => {
    if (sortBy === 'byLike') {
        return movies.sort((a, b) => b.likes - a.likes)
    } else if (sortBy === 'byTitle') {
        return movies.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) { 
                return -1 
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) { 
                return 1 
        }
            return 0;
    })
    } else {
        return movies
    }
}

// Render Movies

const renderMovies = (movies, filter) => {
    const moviesEl = $('#main-movies-container')
    movies = sortMovies(movies, filter)
    // console.log('MOVIES', movies)

    moviesEl.html('')

    if (movies.length > 0) {
        movies.forEach((movie) => {
            const movieEl = generateMovieDOM(movie, movie.shortenOverview)
            // console.log('movielEL', movieEl)
            moviesEl.append(movieEl)
        })
    } else {
        moviesEl.append(`<p class="empty-message">No movies to show</p>`)
    }
}

// Add like

const addLike = (movies, id) => {
    const movie = movies.find((movie) => movie.id === id)
    movie.likes++
    console.log(movie)
    console.log(movies)
}


// Toggles full description text / shortened

const toggleDescriptionText = (movies, id) => {
    const movie = movies.find((movie) => movie.id === id)
    movie.shortenOverview = !movie.shortenOverview
    console.log(movie)
}
