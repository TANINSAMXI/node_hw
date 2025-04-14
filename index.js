const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
const users = [
    { name: 'A', age: 25, email: 'a@example.com' },
    { name: 'B', age: 26, email: 'b@example.com' },
    { name: 'C', age: 25, email: 'c@example.com' },
    { name: 'D', age: 30, email: 'd@example.com' },
    { name: 'E', age: 45, email: 'e@example.com' },
    { name: 'F', age: 30, email: 'f@example.com' },
    { name: 'G', age: 29, email: 'g@example.com' },
    { name: 'H', age: 31, email: 'h@example.com' },
    { name: 'I', age: 22, email: 'i@example.com' }
];

app.get('/', (req, res) => {
    res.render('users', { users });
});

app.listen(port, () => {
    console.log(` http://localhost:${port}`);
});
