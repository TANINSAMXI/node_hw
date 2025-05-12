const Category = require('./models/category');
const Product = require('./models/product');
const Order = require('./models/order');

const createInitialData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const smartphonesCategory = new Category({ name: 'Smartphones' });
        const tvCategory = new Category({ name: 'TVs' });
        const pcCategory = new Category({ name: 'PCs' });
        await smartphonesCategory.save();
        await tvCategory.save();
        await pcCategory.save();

        const product1 = new Product({
            name: 'iPhone 13',
            price: 999,
            quantity: 50,
            category: smartphonesCategory._id,
        });
        const product2 = new Product({
            name: 'Samsung Galaxy S21',
            price: 799,
            quantity: 30,
            category: smartphonesCategory._id,
        });
        const product3 = new Product({
            name: 'MacBook Pro',
            price: 1999,
            quantity: 15,
            category: pcCategory._id,
        });
        const product4 = new Product({
            name: 'LG OLED TV',
            price: 1200,
            quantity: 20,
            category: tvCategory._id,
        });
        await product1.save();
        await product2.save();
        await product3.save();
        await product4.save();

        const order1 = new Order({
            products: [product1._id, product2._id],
            totalPrice: 1798,
        });
        const order2 = new Order({
            products: [product3._id, product4._id],
            totalPrice: 3199,
        });
        await order1.save();
        await order2.save();

        console.log('Initial data has been added!');
    } catch (error) {
        console.error('Error during initial data creation:', error);
    }
};

module.exports = createInitialData;
