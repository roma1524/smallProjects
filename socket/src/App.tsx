import {useEffect, useRef, useState} from 'react'
import './App.css'

import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer, createConnection, deleteConnection, setClientName, setNewMessage} from "./chat-reducer.ts";
import {thunk} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({chat: chatReducer})
type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk));


function App() {

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScrollActive, setAutoScrollActive] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(createConnection())

        return () => {
            dispatch(deleteConnection())
        }
    }, [])

    useEffect(() => {
        if (autoScrollActive) {
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
                    <button onClick={() => {
                        dispatch(setClientName(name))
                    }}>Send Name
                    </button>
                    <textarea value={message} onChange={
                        (e) => setMessage(e.currentTarget.value)
                    }
                              placeholder='Message'
                    ></textarea>
                    <button onClick={() => {
                        dispatch(setNewMessage(message))
                    }}>Send
                    </button>
                </div>
            </div>

    )
}

export default App
