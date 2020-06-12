let moviesData
let filter = $('#main-sort-container__select').val()

$(document).ready(async () => {

    moviesData = await loadMovies()

    // console.log(filter)

    // console.log(moviesData)

    console.log(sortMovies(moviesData, 'byLike'))

    renderMovies(moviesData, filter)

    $('.main-movie-img-container').addClass('animate__animated animate__zoomInLeft')
    $('.main-movie-title-likes-container').addClass('animate__animated animate__zoomInRight')

    $('#main-sort-container__select').on('change', () => {
        filter = $('#main-sort-container__select').val()
        renderMovies(moviesData, filter)
    })


    $(document).on('click', '.main-movie-likes-container__like-button', (e) => {
        const id = parseInt($(e.target).attr('movieID'))
        addLike(moviesData, id)
        // renderMovies(moviesData, filter)
    })

    $(document).on('click', '.main-movie-title-container__description', (e) => {
        console.log(e)
        const id = parseInt($(e.target).attr('movieID'))
        toggleDescriptionText(moviesData, id)
        // renderMovies(moviesData, filter)
    })

    $(document).on('click', '.main-movie-img-container', (e) => {
        console.log(e.target.parentNode)
        $(e.target.parentNode).removeClass('animate__animated animate__zoomInLeft')
        $(e.target.parentNode).addClass('animate__animated animate__heartBeat')
    })

})
