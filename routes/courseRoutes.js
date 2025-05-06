const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);
router.get('/students-per-course', courseController.getStudentsPerCourse);
router.get('/high-rated-courses', courseController.getHighRatedCourses);

module.exports = router;
