// This server uses only modules that are included with Node.js.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const publicDirectory = path.join(__dirname, 'public');

// These messages live in memory and reset whenever the server restarts.
const messages = [
  { id: 1, author: 'Aki', text: 'Hello from the KIC lecture!' },
  { id: 2, author: 'Ren', text: 'I am learning how the frontend talks to the backend.' },
  { id: 3, author: 'Mina', text: 'This message came from the server API.' }
];

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8'
};

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  // Return the in-memory messages as JSON for the frontend.
  if (request.method === 'GET' && requestUrl.pathname === '/api/messages') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(messages));
    return;
  }

  if (request.method !== 'GET') {
    response.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Method Not Allowed');
    return;
  }

  // Map the root URL to the frontend's main page.
  const requestedPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(requestedPath);
  } catch {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Bad Request');
    return;
  }

  const filePath = path.resolve(publicDirectory, `.${decodedPath}`);
  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, fileContents) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not Found');
      return;
    }

    const contentType = contentTypes[path.extname(filePath)] || 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(fileContents);
  });
});

server.listen(PORT, () => {
  console.log(`KIC Web Application Starter is running at http://localhost:${PORT}`);
});