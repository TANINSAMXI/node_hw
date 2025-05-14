const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const token = await userService.login(req.body);
        res.json({ token });
    } catch (err) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const getProfile = (req, res) => {
    res.json(req.user);
};

const getOrderCount = async (req, res) => {
    try {
        const count = await userService.getOrderCount(req.params.id);
        res.json({ count });
    } catch (err) {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { createUser, login, getProfile, getOrderCount };
