const { parentPort, workerData } = require('worker_threads');
function factorial(n) {
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}
const number = BigInt(workerData);
const result = factorial(number);
parentPort.postMessage(result.toString());
