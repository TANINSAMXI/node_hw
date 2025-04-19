const message = "Hillel";

const buffer = Buffer.from(message, 'utf8');
console.log("Binary (hex):", buffer.toString('hex'));
console.log("Binary (base64):", buffer.toString('base64'));

const restoredMessage = buffer.toString('utf8');
console.log("Restored text:", restoredMessage);
