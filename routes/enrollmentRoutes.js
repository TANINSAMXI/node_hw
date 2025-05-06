const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.post('/register', enrollmentController.registerStudent);
router.get('/', enrollmentController.getAllEnrollments);
router.put('/update-grade', enrollmentController.updateGrade);

module.exports = router;

