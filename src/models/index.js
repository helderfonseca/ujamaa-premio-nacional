
const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
//const Candidate = require('./candidate');
//const Category = require('./category');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = {}

//const candidate = Candidate(sequelize, Sequelize.DataTypes);
//const category = Category(sequelize, Sequelize.DataTypes);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

/*candidate.belongsTo(category, {
  foreignKey: {
    name: 'category_id'
  }
});
category.hasMany(candidate, {
  foreignKey: {
    name: 'category_id'
  }
});*/

db.sequelize = sequelize
db.Sequelize = Sequelize

/*const db = {
  sequelize,
  candidate,
  category
}*/

module.exports = db;
