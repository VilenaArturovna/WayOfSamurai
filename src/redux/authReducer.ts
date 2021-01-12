import {Dispatch} from "redux";
import {authAPI} from "../api/api";

export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean

}

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

            return {...state, ...action.data, isAuth: true}
        /*case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}*/
        default:
            return state
    }
}

export const setAuthUserDataAC = (data: AuthDataType) => {
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


