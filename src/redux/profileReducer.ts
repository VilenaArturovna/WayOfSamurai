import {ActionsTypes, PostsPageType, PostsType} from "./store";

export const profileReducer = (state: PostsPageType, action: ActionsTypes) => {
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