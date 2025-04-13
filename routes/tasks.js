const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController');
const { validateTask, validateStatus } = require('../ middlewares/validateTask.js');

router.get('/', controller.getAllTasks);
router.get('/sorted', controller.getSortedTasks);
router.get('/:id', controller.getTaskById);
router.post('/', validateTask, controller.createTask);
router.put('/:id', validateTask, controller.updateTask);
router.patch('/:id/status', validateStatus, controller.updateTaskStatus);
router.delete('/:id', controller.deleteTask);

module.exports = router;
