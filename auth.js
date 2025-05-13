const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');
require('dotenv').config();

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'default_secret';

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ accessToken: token });
});

router.get('/profile', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.sendStatus(403);
        res.json({ message: 'Access granted', email: user.email });
    } catch (err) {
        res.sendStatus(403);
    }
});

module.exports = router;
