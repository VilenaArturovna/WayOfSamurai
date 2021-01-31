import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI} from "../api/api";
import {FormDataType} from "../Components/Login/Login";
import {RootStateType} from "./store";
import {FormAction, stopSubmit} from "redux-form";


export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export type AuthActionsTypes = ReturnType<typeof setAuthUserDataAC> | FormAction

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

type getAuthUserDataThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AuthActionsTypes>
type ThunkType = ThunkAction<void, RootStateType, unknown, AuthActionsTypes>

export const getAuthUserData = (): getAuthUserDataThunkType => {

    return (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {
        debugger
        return authAPI.authMe().then(data => {
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
            } else {

                dispatch(stopSubmit('Login', {_error: response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'}))
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

