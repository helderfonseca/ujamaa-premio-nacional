
const router = require('express').Router();
const VoteController = require('../controllers/VoteController');

router.post('/candidates/:candidateId/users/:userId', VoteController.vote);

module.exports = router;