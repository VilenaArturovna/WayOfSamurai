import {ActionsTypes, DialogsPageType, MessagesType} from "./store";

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageText = action.body;
            break;
        case 'SEND-MESSAGE':
            let newMessage: MessagesType = {
                id: 4,
                message: state.newMessageText
            };
            state.messages.push(newMessage);
            state.newMessageText = '';
            break;
    }
    return state
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