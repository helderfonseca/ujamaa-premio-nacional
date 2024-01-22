
const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const Candidate = require('./candidate');
const Category = require('./category');
const User = require('./user');


const candidate = Candidate(sequelize, Sequelize.DataTypes);
const category = Category(sequelize, Sequelize.DataTypes);
const user = User(sequelize, Sequelize.DataTypes);

candidate.belongsTo(category, {
  foreignKey: {
    name: 'categoryId'
  }
});

category.hasMany(candidate, {
  foreignKey: {
    name: 'categoryId'
  }
});

const db = {
  sequelize,
  candidate,
  category,
  user
}

module.exports = db;
