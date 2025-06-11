import {useState} from 'react'
import './App.css'

function App() {
    const [message, setMessage] = useState([
        {message: 'Hello Ivan', id: '323223', user: {id: 'ds32323', name: 'Roman'}},
        {message: 'Hello Roman', id: '44444', user: {id: 'ds11111', name: 'Ivan'}}
    ])

    return (
        <div className='App'>
            <div>
                <div style={{border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll'}}>
                    {message.map((item) => {
                       return (<div>
                            <b>{item.user.name}:</b> {item.message}
                            <hr/>
                        </div>)
                    })}
                </div>
                <textarea></textarea>
                <button>Send</button>
            </div>
        </div>
    )
}

export default App
