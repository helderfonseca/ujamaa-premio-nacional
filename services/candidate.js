const Candidate = require('../common/models/candidate');

const CandidateService = {
  create: async(
    name,
    residence,
    phoneNumber,
    projectName,
    projectDescription,
    projectOpeningDate,
    status) => {
      const newCandidate = await Candidate.create({
        name,
        residence,
        phoneNumber,
        projectName,
        projectDescription,
        projectOpeningDate,
        status
      });

      return newCandidate;
  }
}

module.exports = CandidateService;