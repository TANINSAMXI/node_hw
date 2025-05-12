const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/:categoryId/products', categoryController.getProductsInCategory);

module.exports = router;
