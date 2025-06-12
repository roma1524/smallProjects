import {useEffect, useState} from 'react'
import './App.css'
import {io} from "socket.io-client";

const socket = io('http://localhost:5115');

function App() {

    const [messages, setMessages] = useState<Array<any>>([])

    const [message, setMessage] = useState('Hello')

    useEffect(() => {
        socket.on('init-mess', (messages: any) => {
            setMessages(messages)
        })
    }, [])

    return (
        <div className='App'>
            <div>
                <div style={{border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll'}}>
                    {messages?.map((item) => {
                        return (
                            <div key={item.id}>
                                <b>{item.user.name}:</b> {item.message}
                                <hr/>
                            </div>
                        )
                    })}
                </div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
                <button onClick={() => {
                    socket.emit('client-message-sent', message)
                    setMessage('')
                }}>Send
                </button>
            </div>
        </div>
    )
}

export default App
