const User = require('./User')
const Book = require('./Book')
const Movie = require('./Movie')

User.hasMany(Book, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Book.belongsTo(User, {
    foreignKey: 'userId',
})

User.hasMany(Movie, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Movie.belongsTo(User, {
    foreignKey: 'userId',
})