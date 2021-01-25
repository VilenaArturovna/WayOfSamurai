import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {FormDataType} from "../Components/Login/Login";
import {act} from "react-dom/test-utils";

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


type AuthActionsTypes = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof loginAC>

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: AuthDataType = initialState, action: AuthActionsTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.data, isAuth: true}
        case "LOGIN":
            return {...state, ...action.data}
        /*case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}*/
        default:
            return state
    }
}

const setAuthUserDataAC = (data: AuthDataType) => {
    return {
        type: 'SET-USER-DATA',
        data
    } as const
}

export const setAuthUserData = () => {
    return (dispatch: Dispatch<AuthActionsTypes>) => {
        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserDataAC(data.data))
            }
        })
    }
}

const loginAC = (data: FormDataType) => {
    return {
        type: 'LOGIN',
        data
    } as const
}

export const login = (data: FormDataType) => {
    return (dispatch: Dispatch<AuthActionsTypes>) => {
        authAPI.login(data).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(loginAC(data))
            }
        })
    }
}

