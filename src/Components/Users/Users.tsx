import React from "react";
import {followAC, setUsersAC, unfollowAC, UsersType, UserType} from "../../redux/UsersReducer";
import styles from './users.module.css'

type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType) => void
}

const Users = (props: PropsType) => {
    /*if (props.users.length === 0) {
        props.setUsers([{
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
            }])

    }*/
    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div><img src={u.photoUrl} alt=""/></div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                    : <button onClick={() => {props.follow(u.id)}}>Follow</button>
                                }
                                    </div>
                                    </span>
                                    <span>
                                    <span><div>{u.fullName}</div><div>{u.status}</div></span>
                                    <span><div>{u.location.country}</div><div>{u.location.city}</div></span>
                                    </span>
                                    </div>)
                                    }
                                    </div>
                                    )
                                    }

                                    export default Users