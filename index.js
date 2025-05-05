const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '********',
        database: 'courses_db'
    });

    const [avgGrades] = await connection.execute(`
        SELECT s.name, ROUND(AVG(e.grade), 2) AS average_grade
        FROM students s
                 JOIN enrollments e ON s.id = e.student_id
        GROUP BY s.id
    `);
    console.log('Average grade for each student:');
    console.table(avgGrades);

    const [sqlStudents] = await connection.execute(`
        SELECT s.name
        FROM students s
                 JOIN enrollments e ON s.id = e.student_id
                 JOIN courses c ON e.course_id = c.id
        WHERE c.title = 'SQL Basics'
    `);
    console.log('Students enrolled in "SQL Basics":');
    console.table(sqlStudents);

    const [topStudent] = await connection.execute(`
        SELECT s.name, ROUND(AVG(e.grade), 2) AS average_grade
        FROM students s
                 JOIN enrollments e ON s.id = e.student_id
        GROUP BY s.id
        ORDER BY average_grade DESC
            LIMIT 1
    `);
    console.log('Top student by average grade:');
    console.table(topStudent);

    const [studentsPerCourse] = await connection.execute(`
        SELECT c.title, COUNT(DISTINCT e.student_id) AS student_count
        FROM courses c
                 JOIN enrollments e ON c.id = e.course_id
        GROUP BY c.id
    `);
    console.log('Number of students per course:');
    console.table(studentsPerCourse);

    const [highRatedCourses] = await connection.execute(`
        SELECT c.title, ROUND(AVG(e.grade), 2) AS average_grade
        FROM courses c
                 JOIN enrollments e ON c.id = e.course_id
        GROUP BY c.id
        HAVING AVG(e.grade) > 85
    `);
    console.log('Courses with average grade > 85:');
    console.table(highRatedCourses);

    await connection.end();
}

main().catch(console.error);
