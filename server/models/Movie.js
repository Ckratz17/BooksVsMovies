const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({

    movieId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    link: {
        type: String
    }
})

module.exports = movieSchema