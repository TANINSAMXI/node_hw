const fs = require('fs');

const MaskPasswordTransform = require('./app');

const input = fs.createReadStream('input.txt');

const output = fs.createWriteStream('output.txt');

const maskStream = new MaskPasswordTransform();

input.pipe(maskStream).pipe(output);
