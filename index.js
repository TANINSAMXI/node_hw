const fs = require('fs');
const path = require('path');

async function getLargestFile() {
    try {
        const files = await fs.promises.readdir('.');

        let largestFile = null;
        let largestSize = 0;

        const statsPromises = files.map(async (file) => {
            const filePath = path.join('.', file);
            try {
                const stats = await fs.promises.stat(filePath);
                if (stats.isFile() && stats.size > largestSize) {
                    largestFile = file;
                    largestSize = stats.size;
                }
            } catch (err) {
                console.error('Error', err);
            }
        });

        await Promise.all(statsPromises);

        if (largestFile) {
            console.log(`${largestFile}`);
            console.log(`${largestSize} bytes`);
        } else {
            console.log('No files found');
        }
    } catch (err) {
        console.error('Error reading directory', err);
    }
}

getLargestFile();
