const fs = require('fs').promises;
const path = require('path');
const tasksPath = path.join(__dirname, '../data/tasks.json');

exports.readTasks = async () => {
    const data = await fs.readFile(tasksPath, 'utf-8');
    return JSON.parse(data);
};

exports.writeTasks = async (tasks) => {
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
};
