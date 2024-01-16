
const candidate = (sequelize, DataTypes) => {

  const Candidate = sequelize.define('Candidate', {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    residence: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, field: 'phone_number' },
    projectName: { type: DataTypes.STRING, allowNull: false, field: 'project_name' },
    projectDescription: { type: DataTypes.STRING, allowNull: false, field: 'project_description' },
    projectOpeningDate: { type: DataTypes.DATE, allowNull: false, field: 'project_opening_date' },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }

  }, {
    sequelize,
    modelName: 'candidate',
    tableName: 'candidates'
  });

  return Candidate;
};

module.exports = candidate;