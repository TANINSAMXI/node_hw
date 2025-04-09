const fs = require('fs');
const path = require('path');

async function getLargestFile() {
    try {
        const files = await fs.promises.readdir('.');

        const fileStats = [];

        for (const file of files) {
            const filePath = path.join('.', file);
            try {
                const stats = await fs.promises.stat(filePath);
                if (stats.isFile()) {
                    fileStats.push({ file, size: stats.size });
                }
            } catch (err) {
                console.error(`Error reading file stats: ${file}`, err);
            }
        }

        if (fileStats.length === 0) {
            console.log('No files found');
            return;
        }

        const largest = fileStats.reduce((max, current) =>
            current.size > max.size ? current : max
        );

        console.log(`${largest.file}`);
        console.log(`${largest.size} bytes`);
    } catch (err) {
        console.error('Error reading directory', err);
    }
}

getLargestFile();
