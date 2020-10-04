let store: StoreType = {
    _state: {
        postsPage: {
            posts: [
                {id: 1, message: 'Hello', likesCount: 12},
                {id: 2, message: 'My name is...', likesCount: 25},
                {id: 2, message: 'Boo', likesCount: 209},
                {id: 2, message: 'Bla-bla', likesCount: 5},
            ],
            newPostText: 'it-kamasutra.com'
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
        if (action.type === 'ADD-POST') {
            let newPost: PostsType = {
                id: 5,
                message: this._state.postsPage.newPostText,
                likesCount: 0
            };
            this._state.postsPage.posts.push(newPost);
            this._state.postsPage.newPostText = ''
            this._onChange(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.postsPage.newPostText = action.newText;
            this._onChange(this._state)
        }
    }
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
export type PostsPageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type RootStateType = {
    postsPage: PostsPageType
    dialogsPage: DialogsPageType
}
export type AddPostActionType = {
    type: 'ADD-POST'
}
export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}
export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType



export type StoreType = {
    _state: RootStateType
    _onChange: (state: RootStateType) => void

    getState: () => RootStateType
    subscribe: (observer: (state: RootStateType) => void) => void

    dispatch: (action: ActionsTypes) => void

}

export default store;