const http = require('http');
const { createProxyServer } = require('http-proxy');

const proxy = createProxyServer({});

const servers = [
    { target: 'http://localhost:3001' },
    { target: 'http://localhost:3002' },
    { target: 'http://localhost:3003' },
];

let currentServer = 0;
const server = http.createServer((req, res) => {
    const target = servers[currentServer];
    proxy.web(req, res, target);

    currentServer = (currentServer + 1) % servers.length;
});
server.listen(3000, () => {
    console.log('Load balancer running on http://localhost:3000');
});

servers.forEach((server, index) => {
    http.createServer((req, res) => {
        res.end(`Response from server ${index + 1}`);
    }).listen(3001 + index, () => {
        console.log(`Backend server ${index + 1} running at http://localhost:${3001 + index}`);
    });
});
