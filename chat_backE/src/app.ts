// import express from 'express';
// import http from 'http';
// import socketIo from 'socket.io';

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.get('/', (req: any, res: any) => {
// //   res.sendFile(__dirname + '/index.html');
//   res.send('Hello its my first server');
// });

// io.on('connection', (_socket: any) => {
//   console.log('a user connected');
// });

// io.on('client-message-sent', (message: string) => {
//     console.log(message);
//   });

// const PORT = process.env.PORT || 5174

// server.listen(PORT, () => {
//   console.log('listening on *:5174');
// });

import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Настройте правильно для production!
    methods: ["GET", "POST"]
  }
});

// Порт сервера
const PORT = process.env.PORT || 5174

// Обработка обычных HTTP запросов
app.get('/', (req: any, res: any) => {
  res.send('Hello');
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});