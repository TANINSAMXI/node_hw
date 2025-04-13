const fileManager = require('../utils/fileManager');

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await fileManager.readTasks();
        if (req.query.status) {
            return res.json(tasks.filter(t => t.status === req.query.status));
        }
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.getSortedTasks = async (req, res, next) => {
    try {
        const { by } = req.query;
        const tasks = await fileManager.readTasks();
        tasks.sort((a, b) => new Date(a[by]) - new Date(b[by]));
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const tasks = await fileManager.readTasks();
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        next(err);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const tasks = await fileManager.readTasks();
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        const newTask = {
            id: newId,
            title: req.body.title,
            description: req.body.description || '',
            status: req.body.status,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await fileManager.writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const tasks = await fileManager.readTasks();
        const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
        if (idx === -1) return res.status(404).json({ error: 'Task not found' });

        tasks[idx] = {
            ...tasks[idx],
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        };

        await fileManager.writeTasks(tasks);
        res.json(tasks[idx]);
    } catch (err) {
        next(err);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    try {
        const tasks = await fileManager.readTasks();
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.status = req.body.status;
        await fileManager.writeTasks(tasks);
        res.json(task);
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const tasks = await fileManager.readTasks();
        const newTasks = tasks.filter(t => t.id !== parseInt(req.params.id));
        if (newTasks.length === tasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await fileManager.writeTasks(newTasks);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
