const db = require('../config/db');

async function getAverageGrades(req, res) {
    const [avgGrades] = await db.execute(`
        SELECT s.name, ROUND(AVG(e.grade), 2) AS average_grade
        FROM students s
                 JOIN enrollments e ON s.id = e.student_id
        GROUP BY s.id;
    `);
    res.json(avgGrades);
}

async function getStudentsByCourse(req, res) {
    const { courseTitle } = req.params;
    const [sqlStudents] = await db.execute(`
        SELECT s.name
        FROM students s
                 JOIN enrollments e ON s.id = e.student_id
                 JOIN courses c ON e.course_id = c.id
        WHERE c.title = ?;
    `, [courseTitle]);
    res.json(sqlStudents);
}

async function getTopStudent(req, res) {
    const [topStudent] = await db.execute(`
        SELECT s.name, ROUND(AVG(e.grade), 2) AS average_grade
        FROM students s
                 JOIN enrollments e ON s.id = e.student_id
        GROUP BY s.id
        ORDER BY average_grade DESC
        LIMIT 1;
    `);
    res.json(topStudent);
}

module.exports = {
    getAverageGrades,
    getStudentsByCourse,
    getTopStudent
};
