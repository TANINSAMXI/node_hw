const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./auth');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}).catch(err => console.error(err));

app.use(authRoutes);
