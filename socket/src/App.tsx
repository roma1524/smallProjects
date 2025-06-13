import {useEffect, useRef, useState} from 'react'
import './App.css'
import {io} from "socket.io-client";
import {v1} from "uuid";

type Message = {
    message: string;
    id: string;
    user: {
        id: string;
        name: string;
    };
}

const socket = io('http://localhost:5115');

function App() {

    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScrollActive, setAutoScrollActive] = useState(true)

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

        // socket.on('init-mess', (messages: Message[]) => {
        //     setMessages(messages)
        // })
        // socket.on('new-message-sent', (messageItem: Message) => {
        //     setMessages(prevState => [...prevState, messageItem])
        // })
    }, [])

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);

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

    return (
        <div className='App'>
            <div>
                <div style={{border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll'}}
                onScroll={() => {
                    
                }}
                >
                    {messages?.map((item) => {
                        return (
                            <div key={v1()}>
                                <b>{item.user.name}:</b> {item.message}
                                <hr/>
                            </div>
                        )
                    })}
                    <div ref={messagesAnchorRef}></div>
                </div>
                <input value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                <button onClick={handleSetName}>Send Name
                </button>
                <textarea value={message} onChange={
                    (e) => setMessage(e.currentTarget.value)
                }
                placeholder='Message'
                ></textarea>
                <button onClick={handleSendMessage}>Send
                </button>
            </div>
        </div>
    )
}

export default App
