import {api} from "./api.ts";
import { Dispatch } from 'redux';

export interface Message {
    id: string;
    user: { id: string; name: string };
    message: string;
}

interface User {
    id: string;
    name: string;
}

interface ChatState {
    messages: Message[];
    typingUsers: User[];
}

type ChatAction =
    | { type: 'SET_MESSAGES'; messages: Message[] }
    | { type: 'NEW_MESSAGE'; message: Message }
    | { type: 'USER_TYPING'; user: User };

const initialState: ChatState = {
    messages: [],
    typingUsers: [],
};

// Action creators
export const setMessages = (messages: Message[]) => ({type: 'SET_MESSAGES', messages});
export const newMessage = (message: Message) => ({type: 'NEW_MESSAGE', message});
export const userTyping = (user: User) => ({type: 'USER_TYPING', user});

// Reducer
export const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {...state, messages: action.messages, typingUsers: []};
        case 'NEW_MESSAGE':
            return state.messages.some(m => m.id === action.message.id)
                ? state
                : {
                    ...state,
                    messages: [...state.messages, action.message],
                    typingUsers: state.typingUsers.filter(user => user.id !== action.message.user.id)
                };
        case 'USER_TYPING':
            return state.typingUsers.some(u => u.id === action.user.id)
                ? state
                : {...state, typingUsers: [...state.typingUsers, action.user]};
        default:
            return state;
    }
};

// Thunks
export const createConnection = () => (dispatch: Dispatch<ChatAction>) => {
    api.createConnection();
    api.subscribe(
        (messages: Message[], fn: () => void) => {
            dispatch(setMessages({type: 'SET', messages}));
            fn();
        },
        (message: Message) => {
            dispatch(newMessage(message));
        },
        (user: User) => {
            dispatch(userTyping(user));
        }
    );
};

export const setClientName = (name: string) => () => {
    api.sendName(name);
};

export const setNewMessage = (message: string) => () => {
    api.sendMessage(message);
};

export const deleteConnection = () => () => {
    api.deleteConnection();
};

export const typingMessage = () => () => {
    api.typingMessage();
};