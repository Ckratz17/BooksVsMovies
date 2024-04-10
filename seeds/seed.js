const sequelize = require('../config/connection');
const  User = require('../models/User');
const Search = require('../models/Search')
const userData = require('./userData.json');
const searchData = require('./search.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Search.bulkCreate(searchData)


  process.exit(0);
};

seedDatabase();
