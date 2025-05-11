const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }],
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Category, Product, Order };
