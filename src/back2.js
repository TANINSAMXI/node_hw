const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend server 2 is running');
});

app.listen(4002, () => {
    console.log('Backend server 2 is running on http://localhost:4002');
});
