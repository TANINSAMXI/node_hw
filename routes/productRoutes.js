const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:productId/update-stock', productController.updateStock);
router.get('/top-3', productController.getTopProducts);

module.exports = router;
