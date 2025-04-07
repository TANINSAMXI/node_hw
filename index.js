const Chat = require('./chat');

const chat = new Chat();

chat.on('message', (text) => {
    console.log(`message received: ${text}`);
});

chat.send('hello');
