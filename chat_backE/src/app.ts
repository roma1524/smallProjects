import { Server } from 'socket.io';
import { createServer } from 'http';
import express, { Request, Response } from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Настройте правильно для production
    methods: ["GET", "POST"]
  }
});

interface Message {
  message: string;
  id: string;
  user: {
    id: string;
    name: string;
  };
}

const messages: Message[] = [
  {message: 'Hello Ivan', id: '323223', user: {id: 'ds32323', name: 'Roman'}},
  {message: 'Hello Roman', id: '44444', user: {id: 'ds11111', name: 'Ivan'}}
];

const PORT = process.env.PORT || 5115

app.get('/', (req: Request, res: Response) => {
  res.send('Hello WB');
})

io.on('connection', (socket) => {

  socket.on('client-message-sent', (message) => {
    console.log(message);
    
  })

  socket.emit('init-mess', messages)

  console.log('Новое подключение: ');
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
})
