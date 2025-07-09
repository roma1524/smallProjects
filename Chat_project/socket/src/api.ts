import { io, Socket } from "socket.io-client";
import type { Message } from "./chat-reducer.ts";

export const api = {
    socket: null as null | Socket,

    createConnection: () => {
        api.deleteConnection(); // Очищаем предыдущее соединение
        // @ts-ignore
        api.socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5115');

        api.socket.on('connect_error', (err: Error) => {
            console.error('Socket connection error:', err);
        });

        api.socket.on('error', (err: Error) => {
            console.error('Socket error:', err);
        });

        api.socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });
    },

    subscribe: (
        initMessagesHandler: (messages: Message[], fn: () => void) => void,
        newMessageHandler: (message: Message) => void,
        userTypingHandler: (user: string) => void
    ) => {
        if (!api.socket) throw new Error('Socket connection not established');

        api.socket.on('init-mess', initMessagesHandler);
        api.socket.on('new-message-sent', newMessageHandler);
        api.socket.on('user-typing', userTypingHandler);
    },

    sendName: (name: string) => {
        if (!api.socket) throw new Error('Socket connection not established');
        api.socket.emit('client-name', name.trim());
    },

    sendMessage: (message: string) => {
        if (!api.socket) throw new Error('Socket connection not established');
        api.socket.emit('client-message-sent', message.trim());
    },

    typingMessage: () => {
        if (!api.socket) throw new Error('Socket connection not established');
        api.socket.emit('typing-new-message');
    },

    unsubscribe: () => {
        api.socket?.off('init-mess');
        api.socket?.off('new-message-sent');
        api.socket?.off('user-typing');
    },

    deleteConnection: () => {
        api.unsubscribe();
        api.socket?.disconnect();
        api.socket = null;
    }
};