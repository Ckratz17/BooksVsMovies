let imgUrl;
let posterUrl;
let listContainer = $('.my-list-container');
//declare empty array
var tableArr = []

let searchQuery = $('#search-bar-input');

let searchBtn = $('#search-button');

let searchToApi = function (e) {
    let searchTerm = searchQuery.val();
    if (searchTerm) {
        getBookMovie(searchTerm)

    }

}

let getBookMovie = function (search) {
    let booksUrl = 'http://openlibrary.org/search.json?q=' + search + '&limit=2&language:eng'
    let movieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6e44bae1ae373999e2237689e35e2f46&language=en-US&query=' + search + '&page=1&include_adult=false'
    fetch(booksUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayCover(data);
                })
            }
        })
    fetch(movieUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayPoster(data);
                })
            }
        })
}

let displayCover = function (image) {
    imgUrl = 'https://covers.openlibrary.org/b/id/' + image.docs[0].cover_i + '-M.jpg';
    let bookTitle = image.docs[0].title;
    let bookPub = image.docs[0].first_publish_year;
    localStorage.setItem('bookTitle', bookTitle);
    localStorage.setItem('bookPub', bookPub)
    createDisplay();

}

let displayPoster = function (poster) {
    posterUrl = "https://image.tmdb.org/t/p/w185" + poster.results[0].poster_path
    movieTitle = poster.results[0].title;
    movieRelease = poster.results[0].release_date;
    localStorage.setItem('movieTitle', movieTitle);
    localStorage.setItem('movieRelease', movieRelease);
}

let createDisplay = function () {

    // parent to ammend to section
    let columns = document.createElement('div');
    columns.setAttribute('class', 'columns my-list-rows');

    //book div
    let book = document.createElement('div');
    book.setAttribute('class', 'column is-5 dynamic-col');

    //book cover div
    let cover = document.createElement('div');
    cover.setAttribute('class', 'coverImg');

    //book thumbs-up
    let bookUp = document.createElement('button');
    bookUp.setAttribute('type', 'button');
    bookUp.setAttribute('class', 'thumbs-up');
    bookUp.setAttribute('alt', 'Thumbs up button icon');

    //thumbs up icon
    let thumbsUpBook = document.createElement('i');
    thumbsUpBook.setAttribute('class', 'fas fa-thumbs-up');

    //book thumbs-down
    let bookDown = document.createElement('button');
    bookDown.setAttribute('type', 'button');
    bookDown.setAttribute('class', 'thumbs-down');
    bookDown.setAttribute('alt', 'Thumbs down button icon.');

    //thumbs down icon
    let thumbsDownBook = document.createElement('i');
    thumbsDownBook.setAttribute('class', 'fas fa-thumbs-down');

    //book cover
    let bookCover = document.createElement('img');
    bookCover.setAttribute('class', 'book-cover');
    bookCover.setAttribute('src', imgUrl)
    bookCover.setAttribute('alt', 'Book Cover');

    bookUp.append(thumbsUpBook);
    bookDown.append(thumbsDownBook);
    cover.append(bookUp, bookCover, bookDown);

    //title div
    let bookTitleDiv = document.createElement('div');
    bookTitleDiv.setAttribute('class', 'bookTitle');
    bookTitleDiv.textContent = localStorage.getItem('bookTitle');

    let bookPubDiv = document.createElement('div');
    bookPubDiv.setAttribute('class', 'bookPub');
    bookPubDiv.textContent = 'Published: ' + localStorage.getItem('bookPub');

    book.append(cover, bookTitleDiv, bookPubDiv);

    //icon div
    let vsIcon = document.createElement('div');
    vsIcon.setAttribute('class', 'column is-2 dynamic-col');

    //vsIconImg background div
    let vsIconImg = document.createElement('div');
    vsIconImg.setAttribute('class', 'versus');
    vsIcon.append(vsIconImg);


    //movie div
    let movie = document.createElement('div');
    movie.setAttribute('class', 'column is-5 dynamic-col');

    //movie cover div
    let poster = document.createElement('div');
    poster.setAttribute('class', 'posterImg');

    //movie thumbs-up
    let movieUp = document.createElement('button');
    movieUp.setAttribute('type', 'button');
    movieUp.setAttribute('class', 'thumbs-up');
    movieUp.setAttribute('alt', 'Thumbs up button icon.');

    //thumbs up icon
    let thumbsUpMovie = document.createElement('i');
    thumbsUpMovie.setAttribute('class', 'fas fa-thumbs-up');

    //Movie thumbs-down
    let movieDown = document.createElement('button');
    movieDown.setAttribute('type', 'button');
    movieDown.setAttribute('class', 'thumbs-down');

    //                 //thumbs down icon
    let thumbsDownMovie = document.createElement('i');
    thumbsDownMovie.setAttribute('class', 'fas fa-thumbs-down');
    thumbsDownMovie.setAttribute('alt', 'Thumbs down button icon.')

    //book cover
    let moviePoster = document.createElement('img');
    moviePoster.setAttribute('class', 'movie-cover');
    moviePoster.setAttribute('src', posterUrl);
    moviePoster.setAttribute('alt', 'Movie Poster');

    movieUp.append(thumbsUpMovie);
    movieDown.append(thumbsDownMovie);
    poster.append(movieUp, moviePoster, movieDown);

    //title div
    let movieTitleDiv = document.createElement('div');
    movieTitleDiv.setAttribute('class', 'movieTitle');
    movieTitleDiv.textContent = localStorage.getItem('movieTitle');

    let movieReleaseDiv = document.createElement('div');
    movieReleaseDiv.setAttribute('class', 'movieRelease');
    movieReleaseDiv.textContent = 'Released: ' + movieRelease;

    movie.append(poster, movieTitleDiv, movieReleaseDiv);

    columns.append(book, vsIcon, movie);
    listContainer.append(columns);

    var tableData = {
        thumbsUpBk: '',
        thumbsUpMv: '',
        thumbsDownBk: '',
        thumbsDownMv: '',
        bookCover: imgUrl,
        published: localStorage.getItem('bookPub'),
        bookTitle: localStorage.getItem('bookTitle'),
        versus: vsIconImg,
        moviePoster: posterUrl,
        movieTitle: localStorage.getItem('movieTitle'),
        release: localStorage.getItem('movieRelease')
    }
    $('.thumbs-up').click(function (clicks) {
        this.setAttribute('style', 'background-color: green');
        $(this).siblings('.thumbs-down').removeAttr('style');
        if (this === bookUp) {
            tableData.thumbsUpBk = true;
            tableData.thumbsDownBk = false;
            console.log(tableData)
        } else if (this === movieUp) {
            tableData.thumbsUpMv = true;
            tableData.thumbsDownMv = false;
            console.log(tableData);
        }
        arrCheck(clicks);
    });
    $('.thumbs-down').click(function (clicks) {
        this.setAttribute('style', 'background-color: red');
        $(this).siblings('.thumbs-up').removeAttr('style');
        if (this === bookDown) {
            tableData.thumbsDownBk = true;
            tableData.thumbsUpBk = false;
            console.log(tableData);
        } else if (this === movieDown) {
            tableData.thumbsDownMv = true;
            tableData.thumbsUpMv = false;
            console.log(tableData)
        }
        arrCheck(clicks);
    });
    let arrCheck = function () {
        if ((tableData.thumbsUpMv === (true || false)) && (tableData.thumbsUpMv === (true || false))) {
            tableArr.push(tableData);
            console.log(tableArr);
            localStorage.setItem('search', JSON.stringify(tableArr))
            console.log(localStorage.getItem('search'));
        }
    }
}


let init = function () {
    let loadArr = []
    loadArr = JSON.parse(localStorage.getItem('search'))
    console.log(loadArr)
}

init()

document.addEventListener('keydown', (event) => {
    const e = event || window.event;
    if (e.keyCode === 13) {
        searchToApi()
    }
})

searchBtn.click(searchToApi)