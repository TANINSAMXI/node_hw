const express = require('express');
const morgan = require('morgan');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use(morgan(':method :url :date[iso]'));

app.use('/tasks', tasksRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
