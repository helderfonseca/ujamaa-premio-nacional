const { DataTypes } = require("sequelize");

CategoryModel = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}

module.exports = {
  initialize: (sequelize) => {
    const Category = sequelize.define('category', CategoryModel);
    Category.associate = function (models) {
      const { Candidate } = models;
      Category.hasOne(Candidate);
    };
    this.model = Category;
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