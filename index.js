const fs = require('fs');

const readStream = fs.createReadStream('log.txt', {
    encoding: 'utf8',
    highWaterMark: 128
});

readStream.on('data', (chunk) => {
    console.log('new chunk');
    console.log(chunk);
});

readStream.on('end', () => {
    console.log('end');
});

readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});
