const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

// Створення користувача
const createUser = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getOrderCount = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return Order.countDocuments({ user: userId });
};

module.exports = { createUser, login, getOrderCount };
