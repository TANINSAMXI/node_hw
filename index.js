const fs = require('fs');
const path = require('path');
const buffer = Buffer.from('hillel', 'utf-8');
const filePath = path.join(__dirname, 'binary-file.bin');

fs.writeFile(filePath, buffer, (writeErr) => {
    if (writeErr) {
        console.error('Error writing binary file:', writeErr);
        return;
    }

    console.log('Binary file with "hillel" created.');

    fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
            console.error('Error reading binary file:', readErr);
            return;
        }
        console.log('\n Buffer content:', data);
        console.log('\n Text from binary:', data.toString());
        console.log('\n Hex bytes:');
        for (let i = 0; i < data.length; i++) {
            process.stdout.write(data[i].toString(16).padStart(2, '0') + ' ');
        }
        console.log();
    });
});
