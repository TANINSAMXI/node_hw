const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    res.setHeader('Content-Type', 'text/plain');

    if (method === 'GET') {
        if (url === '/') {
            res.statusCode = 200;
            res.end('Home Page');
        } else if (url === '/about') {
            res.statusCode = 200;
            res.end('About Us');
        } else {
            res.statusCode = 404;
            res.end('404 Not Found');
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
