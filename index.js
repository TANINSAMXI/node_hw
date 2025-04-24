const cluster = require('cluster');
const os = require('os');
const express = require('express');
const numberCPU = os.cpus().length;
if (cluster.isPrimary) {
    console.log(`Primary PID: ${process.pid}`);
    console.log(`CPUs: ${numberCPU}`);

    for (let i = 0; i < numberCPU; i++) {
        const worker = cluster.fork();
        console.log(`Worker started: PID ${worker.process.pid}`);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker died: PID ${worker.process.pid}`);
        const newWorker = cluster.fork();
        console.log(`New worker started: PID ${newWorker.process.pid}`);
    });

} else {
    const app = express();
    app.use((req, res, next) => {
        console.log(`Request handled by PID: ${process.pid}, Method: ${req.method}, URL: ${req.url}`);
        next();
    });

    app.get('/', (req, res) => {
        res.send(`Handled by worker PID: ${process.pid}`);
    });

    app.get('/health', (req, res) => {
        res.send('OK');
    });

    app.get('/stats', (req, res) => {
        res.json({
            pid: process.pid,
            cpuUsage: process.cpuUsage(),
            memoryUsage: process.memoryUsage()
        });
    });

    app.listen(3000, () => {
        console.log(`Worker listening: PID ${process.pid}`);
    });
}
