const Order = require('../models/order');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrder = async (req, res) => {
    const order = new Order({
        products: req.body.products,
        totalPrice: req.body.totalPrice,
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getTotalProfit = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            { $group: { _id: null, totalProfit: { $sum: "$totalPrice" } } }
        ]);
        res.json(orders[0].totalProfit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
