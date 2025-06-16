const initialState = {
    messages: [],
}

export const chatReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case 'SET_MESSAGE': {

        }
        default: return state;
    }
}