const bcrypt = require('bcrypt');
const user = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });

  User.beforeCreate(async (user, options) => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (err) {
      throw new Error(err);
    }
  })

  return User;
};

module.exports = user;