let moviesData
let filter = $('#main-sort-container__select').val()

$(document).ready(async () => {

    moviesData = await loadMovies()

    // console.log(filter)

    // console.log(moviesData)

    console.log(sortMovies(moviesData, 'byLike'))

    renderMovies(moviesData, filter)

    $('#main-sort-container__select').on('change', () => {
        filter = $('#main-sort-container__select').val()
        renderMovies(moviesData, filter)
    })


    $(document).on('click', '.like-button', (e) => {
        const id = parseInt($(e.target).attr('movieID'))
        addLike(moviesData, id)
        renderMovies(moviesData, filter)
    })

    $(document).on('click', '.main-movies-title-container__description', (e) => {
        console.log(e)
        const id = parseInt($(e.target).attr('movieID'))
        toggleDescriptionText(moviesData, id)
        renderMovies(moviesData, filter)
    })

})