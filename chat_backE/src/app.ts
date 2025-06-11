const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
  res.send('Hello its my first server');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(5174, () => {
  console.log('listening on *:5174');
});