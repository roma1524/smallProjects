import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer} from "./chat-reducer.ts";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({chat: chatReducer})
export type AppStateType = ReturnType<typeof rootReducer>
// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
