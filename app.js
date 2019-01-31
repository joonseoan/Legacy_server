const http = require('http');

// callback of createServer
const routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000);
