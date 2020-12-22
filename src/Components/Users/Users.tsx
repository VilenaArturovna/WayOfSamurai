import React from "react";
import {followAC, setUsersAC, unfollowAC, UsersType, UserType} from "../../redux/UsersReducer";
import axios from 'axios';
import userPhoto from '../../assets/images/v547828-288243584.jpg'
import styles from './users.module.css'

type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType) => void
}

class Users extends React.Component<PropsType, any> {
    constructor(props: PropsType) {
        super(props);

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.setUsers(response.data.items)
            }
        )
    }

    render = () => {
        return (
            <div>
                {this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small || userPhoto} alt=""/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span><div>{u.name}</div><div>{u.status}</div></span>
                        <span><div>{'u.location.country'}</div><div>{'u.location.city'}</div></span>
                    </span>
                </div>)
                }
            </div>
        )
    }
}

export default Users