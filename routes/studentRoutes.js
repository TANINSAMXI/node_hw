const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [students] = await db.execute('SELECT * FROM students');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
});

module.exports = router;

