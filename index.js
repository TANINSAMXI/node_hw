const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const password = '1234567';
const hashed = hashPassword(password);
console.log(hashed);
