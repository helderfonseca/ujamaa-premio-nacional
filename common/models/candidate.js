const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
      static associate(models) {
        // define association here
      }
  }

  Candidate.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    residence: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    projectName: { type: DataTypes.STRING, allowNull: false },
    projectDescription: { type: DataTypes.STRING, allowNull: false },
    projectOpeningDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Candidate'
  });

  return Candidate;
};


/*module.exports = {
  initialize: (sequelize) => {
    const Candidate = sequelize.define('candidate', CandidateModel);
    //Candidate.belongsTo(sequelize.models.Category, { foreignKey: 'category_id' });
    
    Candidate.associate = function (models) {
      const { Category } = models;
      Candidate.belongsTo(Category, { foreignKey: 'id', as: 'category' });
    };
    //console.log(Candidate);
    this.model = Candidate;
  },

  createCandidate: (candidate) => {
    return this.model.create(candidate);
  },

  findCandidate: (query) => {
    return this.model.findOne({
      where: query,
    })
  },

  updateCandidate: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    })
  },

  findAllCandidates: (query) => {
    return this.model.findAll({
      where: query
    })
  },

  deleteCandidate: (query) => {
    return this.model.destroy({
      where: query
    })
  }
}
*/