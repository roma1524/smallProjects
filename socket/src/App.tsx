import {useEffect, useRef, useState} from 'react'
import './App.css'

import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer} from "./chat-reducer.ts";
import thunk from "redux-thunk";

type Message = {
    message: string;
    id: string;
    user: {
        id: string;
        name: string;
    };
}

const store = createStore(combineReducers({chat: chatReducer}), applyMiddleware(thunk));



function App() {

    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScrollActive, setAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)




    useEffect(() => {
       if(autoScrollActive) {
           messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
       }
    }, [messages]);



    return (
        <div className='App'>
            <div>
                <div style={{border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll'}}
                     onScroll={(e) => {
                         const element = e.currentTarget;
                         const maxScrollPosition = element.scrollHeight - element.clientHeight;

                         if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
                             setAutoScrollActive(true)
                         } else {
                             setAutoScrollActive(false)
                         }
                         setLastScrollTop(element.scrollTop)
                     }}>
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
