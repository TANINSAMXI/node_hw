const crypto = require('crypto');
const fs = require('fs');


const privateKey = fs.readFileSync( 'D:\\node_hw\\keys\\private.key', 'utf8');

const message = '!';

const signer = crypto.createSign('RSA-SHA256');
signer.update(message);
const signature = signer.sign(privateKey, 'base64');

console.log('Signature:', signature);
