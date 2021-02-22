import {UsersType} from "./UsersReducer";
import {AuthDataType} from "./authReducer";
import {AppType} from "./appReducer";

export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    }
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string | null
        large: string | null
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
}
export type PostsPageType = {
    posts: Array<PostsType>
    profile: ProfileType
    status: string
}
export type RootStateType = {
    profilePage: PostsPageType
    dialogsPage: DialogsPageType
    usersPage: UsersType
    auth: AuthDataType
    app: AppType
}

