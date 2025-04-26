const { Worker } = require('worker_threads');

function runWorker(number) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: number });

        worker.on('message', (result) => {
            resolve({ number, result });
        });

        worker.on('error', (error) => {
            reject(error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
const numbers = [5000n, 6000n, 7000n];

console.log(`Calculating factorials of ${numbers.join(', ')}...`);

Promise.all(numbers.map(runWorker))
    .then(results => {
        results.forEach(({ number, result }, index) => {
            console.log(`\n[${index + 1}] Factorial of ${number} calculated successfully.`);
            console.log(`First 100 characters of result:\n${result.slice(0, 100)}...`);
        });
    })
    .catch(err => {
        console.error(err);
    });
