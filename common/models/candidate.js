const { DataTypes } = require("sequelize");

const CandidateModel = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  name: { type: DataTypes.STRING, allowNull: false },

  residence: { type: DataTypes.STRING, allowNull: false },

  phoneNumber: { type: DataTypes.STRING, allowNull: false },

  projectName: { type: DataTypes.STRING, allowNull: false },

  projectDescription: { type: DataTypes.STRING, allowNull: false },

  projectOpeningDate: { type: DataTypes.DATE, allowNull: false }
}

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('candidate', CandidateModel)
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
