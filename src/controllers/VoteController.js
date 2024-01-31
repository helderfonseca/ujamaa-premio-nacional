const { vote } = require('../models');
const { Sequelize } = require('sequelize');

module.exports = {
  vote: async(req, res) => {
    //let counter = 0;
    //counter++;
    const {
      params: { candidateId, userId },
      //body: { total }
    } = req;

    try {
      const newVote = await vote.create({candidateId, userId, total: Sequelize.literal('total + 1') });
      return res.status(200).json({
        status: true,
        data: newVote.toJSON()
      })
    } catch(err) {
      return res.status(500).json({
        status: false,
        error: err.message
      })
    }
    
  }
}