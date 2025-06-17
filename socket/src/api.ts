import {io} from "socket.io-client";
import {useEffect} from "react";

const socket = io('http://localhost:5115');

useEffect(() => {
    const handleInitMessages = (messages: Message[]) => {
        setMessages(messages);
    };

    const handleNewMessage = (messageItem: Message) => {
        setMessages(prevState => [...prevState, messageItem]);
    };

    socket.on('init-mess', handleInitMessages);
    socket.on('new-message-sent', handleNewMessage);

    return () => {
        socket.off('init-mess', handleInitMessages);
        socket.off('new-message-sent', handleNewMessage);
    };

}, [])

const handleSendMessage = () => {
    if (message.trim()) {
        socket.emit('client-message-sent', message.trim());
        setMessage('');
    }
};
const handleSetName = () => {
    if (name.trim()) {
        socket.emit('client-name', name.trim());
    }
};