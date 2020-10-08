import {ActionsTypes, PostsPageType, PostsType} from "./store";

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'My name is...', likesCount: 25},
        {id: 2, message: 'Boo', likesCount: 209},
        {id: 2, message: 'Bla-bla', likesCount: 5},
    ],
    newPostText: ''
}

export const profileReducer = (state: PostsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = ''
            break;
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText;
            break;
    }
    return state
}

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}
export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
}