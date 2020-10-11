import {ActionsTypes, DialogsPageType, MessagesType} from "./store";

let initialState = {
    dialogs: [
        {id: 1, name: 'Anna'},
        {id: 2, name: 'Helena'},
        {id: 3, name: 'Kate'},
        {id: 4, name: 'Svetlana'},
        {id: 5, name: 'Natalie'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I\'m fine'},
    ],
    newMessageText: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {

        case 'UPDATE-NEW-MESSAGE-TEXT':
            return {...state, newMessageText: action.body};
            break;

        case 'SEND-MESSAGE':
            let newMessage: MessagesType = {
                id: 4,
                message: state.newMessageText
            };

            return {...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''};
            break;

        default:
            return state
    }
}

export const updateNewMessageTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        body: text
    } as const
}
export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE'
    } as const
}