
function fetchBook(event) {
    event.preventDefault()
    const bookSearch = document.querySelector('#search-input').value
    const apiKey = 'AIzaSyAwTE4Zv6FyKRLZFK-PQHkc7fC9RPeo36M'
    const bookQuery = `https://www.googleapis.com/books/v1/volumes?q=${bookSearch}r&key=${apiKey}`
    fetch(bookQuery)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            const bookData = data.items[0].volumeInfo
            console.log(bookData)
    })
}

document.querySelector('#search-btn').addEventListener('click', fetchBook)