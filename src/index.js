const express = require('express');
const router = require('./routes/api');
const connectDB = require('./db');

require('dotenv').config();

(async () => {
    await connectDB();

    const app = express();
    app.use(express.json());
    app.use('/', router);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
