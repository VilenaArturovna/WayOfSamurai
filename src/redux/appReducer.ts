import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootStateType} from "./store";
import {AuthActionsTypes, getAuthUserData} from "./authReducer";


export type AppType = {
    initialized: boolean
}

type AppActionsType = ReturnType<typeof setInitialized>

type ThunkType = ThunkAction<void, RootStateType, unknown, AppActionsType & AuthActionsTypes>

let initialState = {
    initialized: false
}

export const appReducer = (state: AppType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case "SET-INITIALIZED":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const setInitialized = () => {
    return {
        type: 'SET-INITIALIZED'
    }
}

export const initializeApp = (): ThunkType => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, AppActionsType>) => {
        debugger
        let promise = dispatch(getAuthUserData())
        promise.then(() => {return dispatch(setInitialized())})

    }
}