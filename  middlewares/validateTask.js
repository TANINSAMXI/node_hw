const validateTask = (req, res, next) => {
    const { title, status } = req.body;
    const validStatuses = ['todo', 'in-progress', 'done'];

    if (!title || title.length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters long' });
    }

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    next();
};

const validateStatus = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['todo', 'in-progress', 'done'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    next();
};

module.exports = { validateTask, validateStatus };
