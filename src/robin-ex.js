const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer();

const servers = [
    { host: 'localhost', port: 4001 },
    { host: 'localhost', port: 4002 },
    { host: 'localhost', port: 4003 }
];

let current = 0;

app.use((req, res) => {
    const target = servers[current];
    current = (current + 1) % servers.length;

    proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
});

app.listen(4000, () => {
    console.log('Load Balancer is running on http://localhost:4000');
});
