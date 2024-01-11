const { query } = require("express");
const { DataTypes } = require("sequelize");

const CategoryModel = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },

  description: { type: DataTypes.STRING, allowNull: true },
  
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('category', CategoryModel);
  },

  createCategory: (category) => {
    return this.model.create(category);
  },

  findCategory: (query) => {
    return this.model.findOne({
      where: query
    })
  },

  updateCategory: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query
    })
  },

  findAllCategories: (query) => {
    return this.model.findAll({
      where: query
    })
  },

  deleteCategory: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}