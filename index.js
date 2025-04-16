const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

const users = [
    { name: 'A', age: 1, email: 'a@example.com' },
    { name: 'B', age: 2, email: 'b@example.com' },
    { name: 'C', age: 3, email: 'c@example.com' },
];

app.get('/', (req, res) => {
    res.render('users.njk', { users });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});