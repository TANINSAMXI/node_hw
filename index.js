const fs = require('fs');
const path = require('path');
fs.readdir('.', (err, files) => {
    if (err) {
        console.error('Error', err);
        return;
    }

    let largestFile = null;
    let largestSize = 0;

    files.forEach(file => {
        const filePath = path.join('.', file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Error', err);
                return;
            }
            if (stats.isFile() && stats.size > largestSize) {
                largestFile = file;
                largestSize = stats.size;
            }


            if (files.indexOf(file) === files.length - 1) {
                if (largestFile) {
                    console.log(`${largestFile}`);
                    console.log(`Size: ${largestSize} bytes`);
                } else {
                    console.log('No files found');
                }
            }
        });
    });
});
