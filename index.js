const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

app.use(express.json());

// Роути
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Запуск сервера
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

