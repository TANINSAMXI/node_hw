const db = require('../config/db');

const getAllCourses = async (req, res) => {
    console.log('Request to fetch all courses');
    try {
        const [results] = await db.execute('SELECT * FROM courses');
        console.log('Courses fetched successfully:', results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            message: 'Error fetching courses',
            error: error.message || error.toString() || 'Unknown error'
        });
    }
};

const getStudentsPerCourse = async (req, res) => {
    try {
        const [results] = await db.execute(`
            SELECT c.title, COUNT(DISTINCT e.student_id) AS student_count
            FROM courses c
                     JOIN enrollments e ON c.id = e.course_id
            GROUP BY c.id
        `);
        res.json(results);
    } catch (error) {
        console.error('Error fetching students per course:', error);
        res.status(500).json({ message: 'Error fetching students per course', error });
    }
};

const getHighRatedCourses = async (req, res) => {
    try {
        const [results] = await db.execute(`
            SELECT c.title, ROUND(AVG(e.grade), 2) AS average_grade
            FROM courses c
                     JOIN enrollments e ON c.id = e.course_id
            GROUP BY c.id
            HAVING AVG(e.grade) > 85
        `);
        res.json(results);
    } catch (error) {
        console.error('Error fetching high rated courses:', error);
        res.status(500).json({ message: 'Error fetching high rated courses', error });
    }
};

module.exports = { getAllCourses, getStudentsPerCourse, getHighRatedCourses };
