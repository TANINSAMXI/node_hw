const express = require('express');
const { Category, Product, Order } = require('../models');
const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to the Store API!'));

router.get('/products/category/:name', async (req, res) => {
    const category = await Category.findOne({ name: req.params.name });
    if (!category) return res.status(404).send('Category not found');
    const products = await Product.find({ category: category._id });
    res.json(products);
});


router.get('/orders/total-profit', async (req, res) => {
    const orders = await Order.find();
    const total = orders.reduce((sum, o) => sum + o.total, 0);
    res.json({ total });
});


router.get('/products/top', async (req, res) => {
    const orders = await Order.find().populate('products.product');
    const stats = {};
    orders.forEach(order => {
        order.products.forEach(p => {
            const id = p.product._id.toString();
            stats[id] = (stats[id] || 0) + p.quantity;
        });
    });

    const sorted = Object.entries(stats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3);

    const topProducts = await Promise.all(
        sorted.map(async ([id]) => await Product.findById(id))
    );

    res.json(topProducts);
});

router.post('/orders', async (req, res) => {
    const { items } = req.body;
    let total = 0;

    for (let item of items) {
        const product = await Product.findById(item.product);
        if (!product || product.stock < item.quantity)
            return res.status(400).send('Insufficient stock');

        product.stock -= item.quantity;
        total += product.price * item.quantity;
        await product.save();
    }

    const order = new Order({ products: items, total });
    await order.save();
    res.status(201).json(order);
});

module.exports = router;
