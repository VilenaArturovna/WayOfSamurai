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
    users: [  ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export const usersReducer = (state: UsersType = initialState, action: UsersActionsTypes) => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => {return u.id === action.userId ? {...u, followed: true} : u })}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => {return u.id === action.userId ? {...u, followed: false} : u })}
        case 'SET-USERS':
            return {...state, users: action.users}  //не копировать стэйт!!
        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

/*Action Creators*/

export const followSuccess = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsers = (users: UsersType) => {
    return {
        type: 'SET-USERS',
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    } as const
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
        isFetching,
        userId
    } as const
}

/*Thunk Creators*/

 export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch<UsersActionsTypes>) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            }
        )
    }
}
export const onPageChangedTC = (pageNumber: number, pageSize: number) => {
    return (dispatch: Dispatch<UsersActionsTypes>) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(pageNumber, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            }
        )
    }
}
export const follow = (userId: number) => {
    return (dispatch: Dispatch<UsersActionsTypes>) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        followAPI.follow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}
export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<UsersActionsTypes>) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        followAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleIsFollowingProgress(false, userId))
        })
    }
}
