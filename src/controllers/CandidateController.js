const { Candidate } = require('../models');

module.exports = {
  getAllCandidates: (req, res) => {
    const { query: filters } = req;

    Candidate.findAll(filters)
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

    Candidate.findOne({ id: id })
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

    Candidate.create(body)
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
          message: "Body is empty, hence can not update the Candidate"
        }
      })
    }

    Candidate.update({ id: candidateId }, payload)
      .then(() => {
        return Candidate.findCandidate({ id: candidateId });
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

    Candidate.destroy({ id: candidateId })
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