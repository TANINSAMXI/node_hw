const db = require('../config/db');

async function registerStudent(req, res) {
    const { studentId, courseId } = req.body;

    try {
        const [existing] = await db.execute(`
            SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?;
        `, [studentId, courseId]);

        if (existing.length > 0) {
            return res.status(400).json({ message: 'Student already enrolled in this course' });
        }

        await db.execute(`
            INSERT INTO enrollments (student_id, course_id, grade) VALUES (?, ?, NULL);
        `, [studentId, courseId]);

        res.status(201).json({ message: 'Student registered for the course successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student for course', error });
    }
}

async function getAllEnrollments(req, res) {
    try {
        const [enrollments] = await db.execute(`
            SELECT e.id, s.name AS student_name, c.title AS course_title, e.grade
            FROM enrollments e
            JOIN students s ON e.student_id = s.id
            JOIN courses c ON e.course_id = c.id;
        `);
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments', error });
    }
}

async function updateGrade(req, res) {
    const { enrollmentId, grade } = req.body;

    try {
        await db.execute(`
            UPDATE enrollments SET grade = ? WHERE id = ?;
        `, [grade, enrollmentId]);

        res.json({ message: 'Grade updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating grade', error });
    }
}

module.exports = {
    registerStudent,
    getAllEnrollments,
    updateGrade
};
