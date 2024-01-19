
const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

// Category routes
router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);
//router.delete('/:id', CategoryController.deleteCategory);
//router.get('/:id', CategoryController.getCategoryById);

module.exports = router;
