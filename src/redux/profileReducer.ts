import {PostsPageType, PostsType, ProfileType} from "./store";
import {Dispatch} from 'redux';
import {profileAPI} from "../api/api";


type ActionsTypes = ReturnType<typeof addPost> |
    ReturnType<typeof setProfile> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof deletePost>

let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 12},
        {id: 2, message: 'My name is...', likesCount: 25},
        {id: 2, message: 'Boo', likesCount: 209},
        {id: 2, message: 'Bla-bla', likesCount: 5},
    ],

    profile: {
        aboutMe: "",
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
        fullName: "Fake",
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
        case 'profile/ADD-POST': {
            let newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        }
        case "profile/DELETE-POST": {
            return {...state, posts: state.posts.filter(p => p.id != action.id)};
        }
        case 'profile/SET-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'profile/SET-STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export const addPost = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const)

export const deletePost = (id: number) => ({type: 'profile/DELETE-POST', id} as const)

export const setProfile = (profile: ProfileType) => ({type: 'profile/SET-PROFILE', profile} as const)

export const setStatus = (status: string) => ({type: 'profile/SET-STATUS', status} as const)

export const getProfile = (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setProfile(response.data))
}

export const getStatus = (userId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}