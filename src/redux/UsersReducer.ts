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
}
export type UsersActionsTypes = ReturnType<typeof follow> |
                    ReturnType<typeof unfollow> |
                    ReturnType<typeof setUsers> |
                    ReturnType<typeof setCurrentPage> |
                    ReturnType<typeof setTotalUsersCount> |
                    ReturnType<typeof toggleIsFetching>

let initialState = {
    users: [  ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
        default:
            return state
    }
}

export const follow = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
export const unfollow = (userId: number) => {
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
