const crypto = require('crypto');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usersFilePath = path.join(__dirname, 'users.json');
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function loadUsers() {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } else {
        return {};
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}
function register() {
    rl.question('Enter username: ', (username) => {
        const users = loadUsers();

        if (users[username]) {
            console.log('Username already exists!');
            rl.close();
            return;
        }

        rl.question('Enter password: ', (password) => {
            const hashedPassword = hashPassword(password);
            users[username] = hashedPassword;
            saveUsers(users);

            console.log('Done!');
            rl.close();
        });
    });
}

function login() {
    rl.question('Enter username: ', (username) => {
        const users = loadUsers();

        if (users[username]) {
            rl.question('Enter password: ', (password) => {
                const hashedPassword = hashPassword(password);
                if (hashedPassword === users[username]) {
                    console.log('Login successful!');
                } else {
                    console.log('Incorrect password!');
                }
                rl.close();
            });
        } else {
            console.log('User not found!');
            rl.close();
        }
    });
}

function menu() {
    rl.question('1. Registration\n2. Login\nChoose option: ', (option) => {
        if (option === '1') {
            register();
        } else if (option === '2') {
            login();
        } else {
            console.log('Invalid choice!');
            rl.close();
        }
    });
}

menu();
