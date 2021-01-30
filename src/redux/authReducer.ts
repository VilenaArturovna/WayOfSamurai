import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../api/api";
import {FormDataType} from "../Components/Login/Login";
import {RootStateType} from "./store";


export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
/*
type loginType = {
    email: string
    password: string
    rememberMe: boolean
}
*/


type AuthActionsTypes = ReturnType<typeof setAuthUserDataAC>

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: AuthDataType = initialState, action: AuthActionsTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.payload}

        default:
            return state
    }
}

const setAuthUserDataAC = ({id, login, email, isAuth}: AuthDataType) => {
    return {
        type: 'SET-USER-DATA',
        payload: {id, login, email, isAuth}
    } as const
}

type ThunkType = ThunkAction<void, RootStateType, unknown, AuthActionsTypes>

export const getAuthUserData = (): ThunkType => {

    return (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {
        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                let isAuth = true
                dispatch(setAuthUserDataAC({id, login, email, isAuth}))
            }
        })
    }
}

export const login = (data: FormDataType): ThunkType => {

    return (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {

        authAPI.login(data).then(response => {

            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
    }
}

export const logout = (): ThunkType => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                let id = null,
                    login = null,
                    email = null,
                    isAuth = false;
                dispatch(setAuthUserDataAC({id, login, email, isAuth}))
            }
        })
    }
}

