// Loads the Movies from our JSON file

const loadMovies = async () => {
    let movies = []
    await $.getJSON('./data/movie-data.json', data => movies = data.results)
    return movies
}

// Generate the DOM structure for a movie

const generateMovieDOM = (movie, shortenOverview) => {
    /* The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. */
    const { img, title, id, overview } = movie
    /* Decides regarding the shortenOverview property if we want to cut the text or not */
    const overviewText = shortenOverview ? `${overview.substring(0, 38)}...` : overview
    /* Creating movie element HTML */
    const movieElementHTML =
        `<div class='main-movie-container'>
                        <div class='main-movie-img-container' id="main-movies-img-container">
                            <img class='main-movie-img-container__img' src='${img}'>
                        </div>
                        <div class="main-movie-title-likes-container" id="main-movies-title-likes-container">
                            <div class='main-movie-title-container'>
                                <p class='main-movie-title-container__title'>${title}</p>
                                <p class='main-movie-title-container__description' movieId="${id}">${overviewText}</p>
                            </div>
                            <div class='main-movie-likes-container'>
                                <p class='main-movie-likes-container__text'><span movieId="${id}" class="main-movie-likes-container__like-button"><span class='like-text' movieId="${id}">Like </span><span class="like-sign" movieId="${id}">👍</span></span><span class='main-movie-likes-container__likes-number'>${movie.likes}</span></p>
                            </div>
                        </div>
                    </div>`

    return movieElementHTML
}

//Sort your movies by one of two ways (by likes or by number)

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

// Render Movies (it takes an array and our filter(sort by) and renders the movie elements to the DOM)

const renderMovies = (movies, filter) => {
    const moviesEl = $('#main-movies-container')
    movies = sortMovies(movies, filter)

    moviesEl.html('')

    if (movies.length > 0) {
        movies.forEach((movie) => {
            const movieEl = generateMovieDOM(movie, movie.shortenOverview)
            moviesEl.append(movieEl)
        })
    } else {
        moviesEl.append(`<p class="empty-message">No movies to show</p>`)
    }
}

// Adds likes (it finds the item from our movies array and adds one like by each call to the original value)

const addLike = (movies, id) => {
    const movie = movies.find((movie) => movie.id === id)
    if (movie.likes < 100) {
        movie.likes++
        renderMovies(moviesData, filter)
    }
}

// Toggles full description text / shortened

const toggleDescriptionText = (movies, id) => {
    const movie = movies.find((movie) => movie.id === id)
    movie.shortenOverview = !movie.shortenOverview
    renderMovies(moviesData, filter)
}
