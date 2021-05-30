import {followAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: string | null
        large: string | null
    }
    status: string
    followed: boolean
    /*location: {
        city: string
        country: string
    }*/
}
export type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type UsersActionsTypes = ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleIsFollowingProgress>

let initialState = {
    users: [],
    pageSize: 18,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export const usersReducer = (state: UsersType = initialState, action: UsersActionsTypes) => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state, users: state.users.map(u => {
                    return u.id === action.userId ? {...u, followed: true} : u
                })
            }
        case 'users/UNFOLLOW':
            return {
                ...state, users: state.users.map(u => {
                    return u.id === action.userId ? {...u, followed: false} : u
                })
            }
        case 'users/SET-USERS':
            return {...state, users: action.users}  //не копировать стэйт!!
        case "users/SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "users/SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "users/TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "users/TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

/*Action Creators*/

export const followSuccess = (userId: number) => ({type: 'users/FOLLOW', userId} as const)
export const unfollowSuccess = (userId: number) => ({type: 'users/UNFOLLOW', userId} as const)
export const setUsers = (users: UsersType) => ({type: 'users/SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'users/SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: 'users/SET-TOTAL-USERS-COUNT',
    totalUsersCount
} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'users/TOGGLE-IS-FETCHING', isFetching} as const)
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'users/TOGGLE-IS-FOLLOWING-PROGRESS',
    isFetching,
    userId
} as const)

/*Thunk Creators*/

export const getUsersTC = (currentPage: number, pageSize: number) =>
    async (dispatch: Dispatch<UsersActionsTypes>) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
export const onPageChangedTC = (pageNumber: number, pageSize: number) =>
    async (dispatch: Dispatch<UsersActionsTypes>) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
    }

const followUnfollowFlow = async (dispatch: Dispatch<UsersActionsTypes>,
                                  userId: number,
                                  apiMethod: (userId: number) => Promise<any>,
                                  actionCreator: (userId: number) => UsersActionsTypes) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: Dispatch<UsersActionsTypes>) => {
    await followUnfollowFlow(dispatch, userId, followAPI.follow, followSuccess)
}
export const unfollow = (userId: number) => async (dispatch: Dispatch<UsersActionsTypes>) => {
    await followUnfollowFlow(dispatch, userId, followAPI.unfollow, unfollowSuccess)
}
