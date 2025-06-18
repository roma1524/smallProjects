import {io} from "socket.io-client";
import type {Message} from "./chat-reducer.ts";


export const api = {
    socket: null as null | SocketIOClient.Socket,
    createConnection:() => {
        api.socket = io('http://localhost:5115');
        api.socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });
    },
    subscribe:(initMessagesHandler: (messages: Message[]) => void,
              newMessageHandler: (message: Message) => void
    ) => {
        api.socket?.on('init-mess', initMessagesHandler);
        api.socket?.on('new-message-sent', newMessageHandler);
    },
    sendName:(name: string) => {
        api.socket?.emit('client-name', name.trim())
    },
    sendMessage:(message: string) => {
        api.socket?.emit('client-message-sent', message.trim())
    },
    unsubscribe:() => {
        api.socket?.off('init-mess');
        api.socket?.off('new-message-sent');
    },
    deleteConnection:() => {
        api.unsubscribe();
        api.socket?.disconnect();
        api.socket = null;
    }
}