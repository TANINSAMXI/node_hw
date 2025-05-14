const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
router.get('/:id/orders/count', userController.getOrderCount);

module.exports = router;
