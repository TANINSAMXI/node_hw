const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error', err);
        return;
    }

    const updatedData = data.replace(/Node/g, 'NODE.JS');

    fs.writeFile('output.txt', updatedData, (err) => {
        if (err) {
            console.error('Error', err);
        } else {
            console.log('Done!');
        }
    });
});
