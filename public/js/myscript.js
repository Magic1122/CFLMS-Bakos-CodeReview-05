// This file has just the application logic

// We prepare our variables where we store out data (moviesData and filter)

let moviesData
let filter = $('#main-sort-container__select').val()

$(document).ready(async () => {

    /* Loads the data from movie-data.json (this is an asyncronus function that is why we have to use the await word before the function) */
    moviesData = await loadMovies()

    /* We render our starter state */

    renderMovies(moviesData, filter)

    /* Adds animation to the Movie Elements */

    $('.main-movie-img-container').addClass('animate__animated animate__zoomInLeft')
    $('.main-movie-title-likes-container').addClass('animate__animated animate__zoomInRight')

    /* Adds an event listener to our select element (sort by) */

    $('#main-sort-container__select').on('change', () => {
        filter = $('#main-sort-container__select').val()
        renderMovies(moviesData, filter)
    })
    
    /* Adds event listeners to our like buttons */

    $(document).on('click', '.main-movie-likes-container__like-button', (e) => {
        const id = parseInt($(e.target).attr('movieID'))
        addLike(moviesData, id)
    })

    /* Adds event listeners to our description test (toggles the true or false value to show the full or the shortened text) */

    $(document).on('click', '.main-movie-title-container__description', (e) => {
        console.log(e)
        const id = parseInt($(e.target).attr('movieID'))
        toggleDescriptionText(moviesData, id)
    })

    /* Adds event listeners to our movie images for the hearbeat animation (first we have to clear the onload animation) */

    $(document).on('click', '.main-movie-img-container', (e) => {
        const parentNodes = $(e.target.parentNode)
        parentNodes.removeClass('animate__animated animate__zoomInLeft')
        parentNodes.addClass('animate__animated animate__heartBeat')
        parentNodes.css('cursor', 'default')
    })
})

