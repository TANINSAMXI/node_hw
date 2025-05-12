const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();
const createInitialData = require('./seed'); // Подключаем скрипт сидирования данных

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
        createInitialData();
    })
    .catch(err => console.log(err));

app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
