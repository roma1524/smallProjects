import {useEffect, useRef, useState} from 'react'
import './App.css'
import {createConnection, deleteConnection, setClientName, setNewMessage, typingMessage} from "./chat-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppStateType} from "./main.tsx";
import { ThunkDispatch } from 'redux-thunk';

function App() {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScrollActive, setAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers)
    const dispatch = useDispatch<ThunkDispatch<AppStateType, void, any>>()

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(createConnection())
        }
        return () => {
            isMounted = false;
            dispatch(deleteConnection())
        }
    }, [dispatch])

    useEffect(() => {
        if (autoScrollActive && messagesAnchorRef.current) {
            messagesAnchorRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [messages, autoScrollActive]);

    const handleSendMessage = () => {
        if (message.trim()) {
            dispatch(setNewMessage(message.trim()))
            setMessage('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        } else {
            dispatch(typingMessage())
        }
    }

    return (
        <div className='App'>
            <div>
                <div className="chat-container"
                     onScroll={(e) => {
                         const element = e.currentTarget;
                         const maxScrollPosition = element.scrollHeight - element.clientHeight;
                         setAutoScrollActive(
                             element.scrollTop > lastScrollTop &&
                             Math.abs(maxScrollPosition - element.scrollTop) < 10
                         );
                         setLastScrollTop(element.scrollTop);
                     }}>
                    {messages?.map((item) => (
                        <div key={item.id}>
                            <b>{item.user.name}:</b> {item.message}
                            <hr/>
                        </div>
                    ))}
                    {typingUsers?.map((user) => (
                        <div key={user.id}>
                            <span>{user.name} is typing...</span>
                        </div>
                    ))}
                    <div ref={messagesAnchorRef} />
                </div>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                />
                <button
                    onClick={() => {
                        if (name.trim()) {
                            dispatch(setClientName(name.trim()))
                        }
                    }}
                    disabled={!name.trim()}
                >
                    Set Name
                </button>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message"
                />

                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default App