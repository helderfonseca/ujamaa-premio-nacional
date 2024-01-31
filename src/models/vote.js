

const vote = (sequelize, DataTypes) => {

  const Vote = sequelize.define('Vote', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }

  }, {
    sequelize,
    modelName: 'vote',
    tableName: 'votes'
  });

  return Vote;
}

module.exports = vote;