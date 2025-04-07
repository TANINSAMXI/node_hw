const { Transform } = require('stream');

class MaskPasswordTransform extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk, encoding, callback) {
        const data = chunk.toString();
        const maskedData = data.replace(/password/gi, '********');
        this.push(maskedData);
        callback();
    }
}

module.exports = MaskPasswordTransform;