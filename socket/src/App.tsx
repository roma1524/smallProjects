import {useEffect, useState} from 'react'
import './App.css'
import {io} from "socket.io-client";

const socket = io('http://localhost:5174');

function App() {
    
    const [messages, setMessages] = useState([
        {message: 'Hello Ivan', id: '323223', user: {id: 'ds32323', name: 'Roman'}},
        {message: 'Hello Roman', id: '44444', user: {id: 'ds11111', name: 'Ivan'}}
    ])

    const [message, setMessage] = useState('Hello')

    return (
        <div className='App'>
            <div>
                <div style={{border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll'}}>
                    {messages.map((item) => {
                       return (<div>
                            <b>{item.user.name}:</b> {item.message}
                            <hr/>
                        </div>)
                    })}
                </div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
                <button onClick={() => {
                    socket.emit('client-message-sent', message)
                    setMessage('')
                }}>Send</button>
            </div>
        </div>
    )
}

export default App
