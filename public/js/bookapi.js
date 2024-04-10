const contentRow = document.getElementById('content-row')

function fetchBook() {
    
    const bookSearch = document.querySelector('#search-input').value
    const apiKey = 'AIzaSyAwTE4Zv6FyKRLZFK-PQHkc7fC9RPeo36M'
    const bookQuery = `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}r&key=${apiKey}`
    fetch(bookQuery)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            const bookData = data.items[0].volumeInfo
            console.log(bookData)
           
            // Image tag for book image
            const bookImg = document.querySelector('.book-img')
            bookImg.setAttribute('src', bookData.imageLinks.thumbnail)
            // H3 to hold the book title
            const bookTitle = document.querySelector('.book-title')
            bookTitle.textContent = bookData.title
            //H4 to hold the book author
            const bookAuthor = document.querySelector('.author')
            bookAuthor.textContent = bookData.authors[0]
            //P tag to hold the book description
            const bookDescription = document.querySelector('.book-description')
            bookDescription.textContent = bookData.description
    })
}

function fetchMovie() {
    
    const bookSearch = document.querySelector('#search-input').value
    const apiKey = '0bc1e07221ecc10f51c9906e40d2aa0b'
    const bookQuery = `https://api.themoviedb.org/3/search/movie?query=${bookSearch}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    fetch(bookQuery)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            const movieData = data.results[0]
            console.log(movieData)

            // Image tag for book image
            const movieImg = document.querySelector('.movie-poster')
            movieImg.setAttribute('src', `https://image.tmdb.org/t/p/original${movieData.poster_path}`)
            // H3 to hold the book title
            const movieTitle = document.querySelector('.movie-title')
            movieTitle.textContent = movieData.title
            //P tag to hold the book description
            const movieDescription = document.querySelector('.movie-description')
            movieDescription.textContent = movieData.overview
    })
}

function search(e) {
    e.preventDefault()
    contentRow.classList.remove('display-none')
    fetchBook()
    fetchMovie()
}

document.querySelector('#search-btn').addEventListener('click', search)