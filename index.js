const { exec } = require('child_process');

const command = 'systeminfo';

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Standard error: ${stderr}`);
        return;
    }

    console.log(`System Information:\n${stdout}`);
});
