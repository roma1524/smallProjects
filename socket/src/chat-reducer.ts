import {api} from "./api.ts";

export interface Message {
    id: string;
    user: { name: string };
    message: string;
}

interface ChatState {
    messages: Message[];
}

type ChatAction =
    | { type: 'SET_MESSAGES'; messages: Message[] }
    | { type: 'NEW_MESSAGE'; message: Message };

const initialState = {
    messages: [],
}

export const setMessages = (messages: ChatState) => ({type: 'SET_MESSAGES' as const , messages});
export const newMessage = (message: Message) => ({type: 'NEW_MESSAGE' as const, message});

export const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {...state, messages: action.messages};
        case 'NEW_MESSAGE':
            return {...state, messages: [...state.messages, action.message]};
        default:
            return state;
    }
}

export const createConnection = () => (dispatch: any) => {
    api.createConnection()
    api.subscribe((messages: ChatState) => {dispatch(setMessages(messages))}, (message: Message) => {
        dispatch(newMessage(message));
    })
}

export const setClientName = (name: string) => (dispatch: any) => {
    api.sendName(name);
}
export const setNewMessage = (message: string) => (dispatch: any) => {
    api.sendMessage(message);
}

export const deleteConnection = () => (dispatch: any) => {
    api.deleteConnection();
}

