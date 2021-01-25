import {DialogsPageType} from "./store";

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

}

type ActionsType = ReturnType<typeof sendMessage>

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SEND-MESSAGE":
            debugger
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: action.newMessageText}]
            };

        default:
            return state
    }
}

export const sendMessage = (newMessageText: string) => {
    debugger
    return {
        type: 'SEND-MESSAGE',
        newMessageText
    } as const
}