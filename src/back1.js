const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend server 1 is running');
});

app.listen(4001, () => {
    console.log('Backend server 1 is running on http://localhost:4001');
});
