const EventEmitter = require('events');

class Chat extends EventEmitter {
    send(message) {
        this.emit('message', message);
    }
}

module.exports = Chat;