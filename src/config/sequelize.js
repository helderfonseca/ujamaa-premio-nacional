const { Sequelize } = require('sequelize');

// Set the environment to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load Sequelize configurations based on the environment
const sequelizeConfig = require('../config/config.json')[process.env.NODE_ENV];
const sequelize = new Sequelize(sequelizeConfig);

module.exports = sequelize;