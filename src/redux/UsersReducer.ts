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
}
export type UsersActionsTypes = ReturnType<typeof followAC> |
                    ReturnType<typeof unfollowAC> |
                    ReturnType<typeof setUsersAC> |
                    ReturnType<typeof setCurrentPageAC> |
                    ReturnType<typeof setTotalUsersCountAC>

let initialState = {
    users: [
        /*{
            id: 1,
            followed: true,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            name: 'Anna',
            status: 'Happy New Year!!',
            /!*location: {city: 'Moscow', country: 'Russia'}*!/
        },
        {
            id: 2,
            followed: true,
            uniqueUrlName: null,
            photos: {
                small: 'http://ru-ua.topnews.reviews/phpimage/1575285.jpg',
                large: null
            },
            name: 'Helena',
            status: `Hello! I'm Helena :-)`,
            /!*location: {city: 'Minsk', country: 'Belarus'}*!/
        },*/
        /*{
            id: 3,
            followed: false,
            photoUrl: 'http://ru-ua.topnews.reviews/phpimage/1575285.jpg',
            fullName: 'Kate',
            status: 'I am flying...',
            location: {city: 'St. Petersburg', country: 'Russia'}
        },
        {
            id: 4,
            followed: false,
            photoUrl: 'http://ru-ua.topnews.reviews/phpimage/1575285.jpg',
            fullName: 'Svetlana',
            status: 'How are you?',
            location: {city: 'Omsk', country: 'Russia'}
        },
        {
            id: 5,
            followed: true,
            photoUrl: 'http://ru-ua.topnews.reviews/phpimage/1575285.jpg',
            fullName: 'Irina',
            status: 'Fuck you all!! I am a fairy...',
            location: {city: 'Omsk', country: 'Russia'}
        }*/
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
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
        default:
            return state
    }
}

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsersAC =(users: UsersType) => {
    return {
        type: 'SET-USERS',
        users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalUsersCount
    } as const
}
