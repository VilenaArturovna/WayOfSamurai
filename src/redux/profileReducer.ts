import {PostsPageType, PostsType, ProfileType} from "./store";


type ActionsTypes = ReturnType<typeof addPostAC> |
    ReturnType<typeof updateNewPostTextAC> |
    ReturnType<typeof setProfile>

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'My name is...', likesCount: 25},
        {id: 2, message: 'Boo', likesCount: 209},
        {id: 2, message: 'Bla-bla', likesCount: 5},
    ],
    newPostText: '',
    profile: {
        aboutMe: "sdfsdfsdf",
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: "AlexanderKhodaryonok",
        userId: 3,
        photos: {
            small: null,
            large: null
        }
    }
}

export const profileReducer = (state: PostsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {...state, newPostText: '', posts: [...state.posts, newPost]};
            break;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText};
            break;
        }
        case 'SET-PROFILE': {
            return  {...state, profile: action.profile}
        }
        default:
            return state
    }
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
export const setProfile = (profile: ProfileType) => {
    return {
        type: 'SET-PROFILE',
        profile
    } as const
}