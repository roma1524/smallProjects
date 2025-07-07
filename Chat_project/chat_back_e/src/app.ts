import { Server } from 'socket.io';
import { createServer } from 'http';
import express, { Request, Response } from 'express';
import {v1} from 'uuid'

const app = express();
const server = createServer(app);
const socket = new Server(server, {
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
  {message: 'Hello Ivan', id: v1(), user: {id: v1(), name: 'Roman'}},
  {message: 'Hello Roman', id: v1(), user: {id: v1(), name: 'Ivan'}}
];

const PORT = process.env.PORT || 5115

app.get('/', (req: Request, res: Response) => {
  res.send('Hello WB');
})

const users = new Map()

socket.on('connection', (socketChanel) => {

  users.set(socketChanel, {id: v1(), name: 'anonym'})

  socketChanel.on('typing-new-message', () => {
    socketChanel.broadcast.emit('user-typing', users.get(socketChanel))
  })

  socket.on('disconnect', () => {
    users.delete(socketChanel)
  })

  socketChanel.on('client-name', (name: string) => {
    const user = users.get(socketChanel)
    user.name = name
  })

  socketChanel.on('client-message-sent', (message: string) => {
    if (typeof message !== 'string' || message.length > 20) {
      return 'Message length should be less than 20 chars';
    }

    const user = users.get(socketChanel)

    let messageItem = {message, id: v1(), user: {id: user.id, name: user.name}}
    messages.push(messageItem)

    socketChanel.emit('new-message-sent', messageItem)
    
  })

  socketChanel.emit('init-mess', messages, () => {
    console.log('Init messages received');
    
  })

  console.log('Новое подключение: ');
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
})

console.log('Work')