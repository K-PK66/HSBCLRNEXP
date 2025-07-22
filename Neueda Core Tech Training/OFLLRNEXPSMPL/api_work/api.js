const http = require('http');
const data = {
    name: "Node.js",
    type: "Runtime",
    language: "JavaScript",
}
const server = http.createServer((req, res) => {
    if(req.url === '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'}); // ONLY json accepted
        res.end(JSON.stringify(data));
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});