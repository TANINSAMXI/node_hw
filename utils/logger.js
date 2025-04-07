const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'request.log');

module.exports = function logger(req) {
    const now = new Date().toISOString();
    const message = `[${now}] ${req.method} ${req.url}`;

    console.log(message);

    fs.appendFile(logFilePath, message + '\n', err => {
        if (err) console.error('Помилка запису в лог:', err.message);
    });
};