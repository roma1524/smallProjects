import {api} from "./api.ts";

export interface Message {
    id: string;
    user: { name: string };
    message: string;
}

interface User {
    id: string
    name: string
}

interface ChatState {
    messages: Message[];
    typingUsers: User[]
}

type ChatAction =
    | { type: 'SET_MESSAGES'; messages: Message[] }
    | { type: 'NEW_MESSAGE'; message: Message }
    | { type: 'USER_TYPING'; user: User };

const initialState = {
    messages: [],
    typingUsers: [],
}

export const setMessages = (messages: ChatState) => ({type: 'SET_MESSAGES' as const , messages});
export const newMessage = (message: Message) => ({type: 'NEW_MESSAGE' as const, message});
export const userTyping = (user: User) => ({type: 'USER_TYPING' as const, user});

export const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {...state, messages: action.messages};
        case 'NEW_MESSAGE':
            return {...state,
                messages: [...state.messages, action.message],
                typingUsers: state.typingUsers.filter(user => user.id !== action.message.user.id)
            };
            case 'USER_TYPING':
                return {...state, typingUsers: [...state.typingUsers?.filter(u => u.id !== action.user.id), action.user]}
        default:
            return state;
    }
}

export const createConnection = () => (dispatch: any) => {
    api.createConnection()
    api.subscribe(
        (messages: any, fn: () => void) => {
            dispatch(setMessages(messages))
            fn();
        },
        (message: Message) => {
            dispatch(newMessage(message));
        },
        (user: any) => {
            dispatch(userTyping(user));
        }
    )
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
export const typingMessage = () => (dispatch: any) => {
    api.typingMessage();
}

