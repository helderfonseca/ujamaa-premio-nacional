const router = require('express').Router();
const UserController = require('../controllers/UserController');
const CheckPermissionMiddleware = require('../middlewares/CheckPermissionMiddleware');
const { roles } = require('../config/config');


router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.put('/change-role/:id', UserController.changeRole);

module.exports = router;