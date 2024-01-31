
const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const Candidate = require('./candidate');
const Category = require('./category');
const User = require('./user');
const Vote = require('./vote');


const candidate = Candidate(sequelize, Sequelize.DataTypes);
const category = Category(sequelize, Sequelize.DataTypes);
const user = User(sequelize, Sequelize.DataTypes);
const vote = Vote(sequelize, Sequelize.DataTypes);

user.hasOne(vote, {
  foreignKey: {
    name: 'userId'
  }
});

vote.belongsTo(user, {
  foreignKey: {
    name: 'userId'
  }
});

candidate.hasOne(vote, {
  foreignKey: {
    name: 'candidateId'
  }
});

vote.belongsTo(candidate, {
  foreignKey: {
    name: 'candidateId'
  }
})

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
  user,
  vote
}

module.exports = db;
