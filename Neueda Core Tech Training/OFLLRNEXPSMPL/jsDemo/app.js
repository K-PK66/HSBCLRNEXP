const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200; // The status code of response
    res.setHeader('Content-Type', 'text/plain'); // The content being sent to the client is plain text
    res.end('Hello from node.js\n'); // End of response
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`); // Make sure the server has been running already
});