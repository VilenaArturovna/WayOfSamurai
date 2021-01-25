import {PostsPageType, PostsType, ProfileType} from "./store";
import {Dispatch} from 'redux';
import {profileAPI} from "../api/api";


type ActionsTypes = ReturnType<typeof addPost> |
    ReturnType<typeof setProfile> |
    ReturnType<typeof setStatus>

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'My name is...', likesCount: 25},
        {id: 2, message: 'Boo', likesCount: 209},
        {id: 2, message: 'Bla-bla', likesCount: 5},
    ],

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
    },
    status: ''
}

export const profileReducer = (state: PostsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD-POST': {
            debugger
            let newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        }
        case 'SET-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export const addPost = (newPostText: string) => {
    debugger
    return {
        type: 'ADD-POST',
        newPostText
    } as const
}
export const setProfile = (profile: ProfileType) => {
    return {
        type: 'SET-PROFILE',
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: 'SET-STATUS',
        status
    } as const
}

export const getProfile = (userId: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        profileAPI.getProfile(userId).then(response => {
            dispatch(setProfile(response.data))
        })
    }
}

export const getStatus = (userId: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        profileAPI.updateStatus(status).then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            }
        )
    }
}