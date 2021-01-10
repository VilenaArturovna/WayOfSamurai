import {ReactNode} from "react";

export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean

}

type AuthActionsTypes = ReturnType<typeof setAuthUserData> /*|
                  ReturnType<typeof toggleIsFetching>*/

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export const authReducer = (state: AuthDataType = initialState, action: AuthActionsTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            debugger
            return {...state, ...action.data, isAuth: true}
        /*case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}*/
        default:
            return state
    }
}

export const setAuthUserData = (data: AuthDataType) => {
    debugger
    return {
        type: 'SET-USER-DATA',
        data
    } as const
}

/*export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    } as const
}*/
