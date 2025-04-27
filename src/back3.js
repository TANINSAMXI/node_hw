const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Backend server 3 is running');
});

app.listen(4003, () => {
    console.log('Backend server 3 is running on http://localhost:4003');
});
