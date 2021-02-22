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
type ThunkType = ThunkAction<void, RootStateType, unknown, AuthActionsTypes>
type getAuthUserDataThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AuthActionsTypes>

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: AuthDataType = initialState, action: AuthActionsTypes) => {
    switch (action.type) {
        case 'auth/SET-USER-DATA':
            return {...state, ...action.payload}
        default:
            return state
    }
}

const setAuthUserDataAC = ({id, login, email, isAuth}: AuthDataType) => ({
    type: 'auth/SET-USER-DATA',
    payload: {id, login, email, isAuth}
} as const)

export const getAuthUserData = (): getAuthUserDataThunkType =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {
        let data = await authAPI.authMe()
        if (data.resultCode === 0) {
            let {id, login, email} = data.data
            let isAuth = true
            dispatch(setAuthUserDataAC({id, login, email, isAuth}))
        }
    }

export const login = (data: FormDataType): ThunkType =>
    async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {
        let response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            await dispatch(getAuthUserData())
        } else {
            dispatch(stopSubmit('Login',
                {_error: response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'}))
        }
    }

export const logout = (): ThunkType => async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsTypes>) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        let id = null,
            login = null,
            email = null,
            isAuth = false;
        dispatch(setAuthUserDataAC({id, login, email, isAuth}))
    }
}

