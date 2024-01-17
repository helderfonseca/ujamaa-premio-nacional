
const category = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }

  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categories'
  });

  Category.associate = (models) => {
    Category.hasMany(models.Candidate, {
      foreignKey: 'category_id'
    })
  }

  return Category;
};

module.exports = category;