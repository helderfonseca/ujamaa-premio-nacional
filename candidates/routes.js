const router = require('express').Router();
const CandidateController = require('./controllers/CandidateController');

router.get('/', CandidateController.getAllCandidates);
router.post('/', CandidateController.createCandidate);
router.delete('/:id', CandidateController.deleteCandidate);
router.get('/:id', CandidateController.getCandidateById);

module.exports = router;