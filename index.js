const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const products = [
    { name: 'A', inStock: true },
    { name: 'B', inStock: false },
    { name: 'C', inStock: true },
    { name: 'D', inStock: false }
];

app.get('/', (req, res) => {
    res.render('products', { products });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});