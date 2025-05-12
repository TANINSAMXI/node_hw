const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { quantitySold } = req.body;
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.quantity -= quantitySold;

        if (product.quantity < 0) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        await product.save();
        res.json({ message: "Stock updated", product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTopProducts = async (req, res) => {
    try {
        const products = await Order.aggregate([
            { $unwind: "$products" },
            { $group: { _id: "$products", salesCount: { $sum: 1 } } },
            { $sort: { salesCount: -1 } },
            { $limit: 3 },
            { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "productDetails" } },
            { $unwind: "$productDetails" },
            { $project: { name: "$productDetails.name", salesCount: 1 } }
        ]);

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
