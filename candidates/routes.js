const router = require('express').Router();
const CandidateController = require('./controllers/CandidateController');
const CategoryController = require('./controllers/CategoryController')


// Candidates routes
router.get('/', CandidateController.getAllCandidates);
router.post('/', CandidateController.createCandidate);
router.delete('/:id', CandidateController.deleteCandidate);
router.get('/:id', CandidateController.getCandidateById);

// Category routes
router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/:id', CategoryController.getCategoryById);

module.exports = router;