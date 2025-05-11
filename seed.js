const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Category, Product } = require('./src/models');

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
    await Category.deleteMany();
    await Product.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Smartphones' },
        { name: 'TVs' },
        { name: 'PCs' }
    ]);

    const products = [
        { name: 'iPhone 14', price: 999, stock: 10, category: categories[0]._id },
        { name: 'Samsung Galaxy S22', price: 850, stock: 15, category: categories[0]._id },
        { name: 'Xiaomi 13', price: 600, stock: 20, category: categories[0]._id },

        { name: 'LG OLED CX', price: 1200, stock: 5, category: categories[1]._id },
        { name: 'Samsung QLED Q60', price: 1000, stock: 8, category: categories[1]._id },
        { name: 'Sony Bravia XR', price: 1100, stock: 6, category: categories[1]._id },

        { name: 'MacBook Pro', price: 2000, stock: 4, category: categories[2]._id },
        { name: 'Dell XPS 13', price: 1500, stock: 7, category: categories[2]._id },
        { name: 'Lenovo Legion 5', price: 1300, stock: 10, category: categories[2]._id }
    ];

    await Product.insertMany(products);

    console.log('Database seeded');
    process.exit();
});
