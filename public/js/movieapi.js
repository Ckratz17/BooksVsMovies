function fetchMovie(event) {
    event.preventDefault()
    const bookSearch = document.querySelector('#search-input').value
    const apiKey = '0bc1e07221ecc10f51c9906e40d2aa0b'
    const bookQuery = `https://api.themoviedb.org/3/search/movie?query=${bookSearch}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    fetch(bookQuery)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            const movieData = data.results[0]
            console.log(movieData)
    })
}

document.querySelector('#search-btn').addEventListener('click', fetchMovie)