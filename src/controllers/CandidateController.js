const { candidate, category } = require('../models');

module.exports = {
  getAllCandidates: async (req, res) => {
    
    try {
      const candidates = await candidate.findAll({ include: category });
      return res.status(200).json({
        status: true,
        data: candidates
      });
    } catch(err){
      return res.status(500).json({
        status: false,
        error: err.message
      })
    }
  },

  getCandidateById: async (req, res) => {
    const {
      params: { id },
    } = req;
    
    const oneCandidate = candidate.findOne({ id });
    try {
      
      return res.status(200).json({
        status: true, 
        data: oneCandidate.toJSON(),
      })

    } catch(err) {
      
      return res.status(500).json({
        status: false,
        error: err.message,
      })
    }
  },

  createCandidate: async (req, res) => {
    const { body } = req;

      console.log(req.body);
      try {
        const newCandidate = await candidate.create({ 
          name: body.name,
          residence: body.residence,
          phoneNumber: body.phoneNumber,
          projectName: body.projectName,
          projectDescription: body.projectDescription,
          projectOpeningDate: body.projectOpeningDate,
          categoryId: body.categoryId
        });
        return res.status(201).json({
          status: true,
          data: newCandidate.toJSON()
        })
      } catch(err) {
        return res.status(500).json({
          status: false,
          error: err.message,
        })
      }
  },

  updateCandidate: async (req, res) => {
    const {
      params: { id },
      body: payload
    } = req;


    if(!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence can not update Candidate'
        }
      })
    }

    try {
      const updatedCandidate = await candidate.update({ where: { id: id } }, payload);
      return res.status(200).json({
        status: true,
        data: updatedCandidate.toJSON()
      })
    } catch(err) {
      return res.status(500).json({
        status: false,
        error: err.message
      })
    }
  },

  /*updateCandidate: (req, res) => {
    const {
      params: { id },
      body: payload,
    } = req;

    if the payload does not have any keys,
    Then we can return an error, as nothing can be update
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update Candidate"
        }
      })
    }

    candidate.update({ id: id }, payload)
      .then(() => {
        return candidate.findCandidate({ id: id });
      })
      .then((candidate) => {
        return res.status(200).json({
          status: true,
          data: candidate.toJSON(),
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err.message,
        })
      })
  },*/

  deleteCandidate: async (req, res) => {
    const {
      params: { candidateId },
    } = req;

    try {
      const candidate = await candidate.destroy({ id: candidateId });
      return res.status(200).json({
        status: true,
        data: {
          candidateDeleted: candidate
        }
      })
    }catch(err) {
      return res.status(500).json({
        status: false,
        data: err.message
      })
    }
  }

  /*deleteCandidate: (req, res) => {
    const {
      params: { candidateId },
    } = req;

    candidate.destroy({ id: candidateId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfCandidatesDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err.message,
        })
      })
  },*/
}