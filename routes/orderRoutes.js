const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);
router.get('/total-profit', orderController.getTotalProfit);

module.exports = router;
