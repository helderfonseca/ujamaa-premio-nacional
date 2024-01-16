const { candidate } = require('../../common/models');

module.exports = {
  getAllCandidates: (req, res) => {
    const { query: filters } = req;

    candidate.findAll(filters)
      .then((candidates) => {
        return res.status(200).json({
          status: true,
          data: candidates,
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
  },

  getCandidateById: (req, res) => {
    const {
      params: { id },
    } = req;

    candidate.findOne({ id: id })
      .then((candidate) => {
        return res.status(200).json({
          status: true,
          data: candidate.toJSON(),
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
  },

  createCandidate: (req, res) => {
    const { body } = req;

    candidate.create(body)
      .then((candidate) => {
        return res.status(201).json({
          status: true,
          data: candidate.toJSON(),
        })
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        })
      })
  },

  updateCandidate: (req, res) => {
    const {
      params: { candidateId },
      body: payload,
    } = req;

    //if the payload does not have any keys,
    // Then we can return an error, as nothing can be update
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the candidate"
        }
      })
    }

    candidate.update({ id: candidateId }, payload)
      .then(() => {
        return CandidateModel.findCandidate({ id: candidateId });
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
          error: err,
        })
      })
  },

  deleteCandidate: (req, res) => {
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
          error: err,
        })
      })
  },
}