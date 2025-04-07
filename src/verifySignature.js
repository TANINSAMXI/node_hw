const crypto = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync('D:\\node_hw\\keys\\public.key', 'utf8');

const message = '!';

const signature = '';

const verifier = crypto.createVerify('RSA-SHA256');
verifier.update(message);
const isVerified = verifier.verify(publicKey, signature, 'base64');

console.log('Signature confirmed:', isVerified);
