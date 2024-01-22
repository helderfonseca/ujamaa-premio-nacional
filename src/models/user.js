const candidate = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }

  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });

  return User;
};

module.exports = user;