const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

router.post('/sign-up', AuthController.registerUser);
router.post('/sign-in', AuthController.signInUser);

module.exports = router;