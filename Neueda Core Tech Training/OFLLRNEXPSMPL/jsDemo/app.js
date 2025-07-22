const http = require('http');
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../index.html');
const server = http.createServer((req, res) => {
    fs.readFile(filePath, (error, content) => {
        res.writeHead(200, {'Content-Type': 'text/html'}); // text/json is also acceptable
        res.end(content);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`); // Make sure the server has been running already
});