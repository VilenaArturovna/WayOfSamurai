import {addPostAC, profileReducer, updateNewPostTextAC} from "./profileReducer";
import {dialogsReducer, sendMessageAC, updateNewMessageTextAC} from "./dialogsReducer";


let store: StoreType = {
    _state: {
        postsPage: {
            posts: [
                {id: 1, message: 'Hello', likesCount: 12},
                {id: 2, message: 'My name is...', likesCount: 25},
                {id: 2, message: 'Boo', likesCount: 209},
                {id: 2, message: 'Bla-bla', likesCount: 5},
            ],
            newPostText: ''
        },
        dialogsPage: {
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
    },
    _onChange() {
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._onChange = observer
    },

    dispatch(action) {
        this._state.postsPage = profileReducer(this._state.postsPage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
            this._onChange(this._state)

    }
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageText: string
}
export type PostsPageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type RootStateType = {
    postsPage: PostsPageType
    dialogsPage: DialogsPageType
}

export type ActionsTypes = ReturnType<typeof addPostAC> |
                           ReturnType<typeof updateNewPostTextAC> |
                           ReturnType<typeof updateNewMessageTextAC> |
                           ReturnType<typeof sendMessageAC>

export type StoreType = {
    _state: RootStateType
    _onChange: (state: RootStateType) => void

    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void

    dispatch: (action: ActionsTypes) => void

}

export default store;