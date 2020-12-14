export type UserType = {
    id: number
    followed: boolean
    photoUrl: string
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UsersType = {
    users: Array<UserType>
}
export type UsersActionsTypes = ReturnType<typeof followAC> |
                    ReturnType<typeof unfollowAC> |
                    ReturnType<typeof setUsersAC>

let initialState = {
    users: [
        {
            id: 1,
            followed: true,
            photoUrl: 'http://ru-ua.topnews.reviews/phpimage/1575285.jpg',
            fullName: 'Anna',
            status: 'Happy New Year!!',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 2,
            followed: true,
            photoUrl: 'http://ru-ua.topnews.reviews/phpimage/1575285.jpg',
            fullName: 'Helena',
            status: `Hello! I'm Helena :-)`,
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
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
        }
    ],

}

export const usersReducer = (state: UsersType = initialState, action: UsersActionsTypes) => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => {return u.id === action.userId ? {...u, followed: true} : u })}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => {return u.id === action.userId ? {...u, followed: false} : u })}
        case 'SET-USERS':
            return {...state, users: [...state.users, action.users]}
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
