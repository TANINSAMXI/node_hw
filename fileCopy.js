const fs = require('fs/promises');

async function copyFile() {
    try {
        await fs.copyFile('source.txt', 'copy.txt');
        console.log('Done!');
    } catch (err) {
        console.error('Error', err.message);
    }
}

copyFile();
