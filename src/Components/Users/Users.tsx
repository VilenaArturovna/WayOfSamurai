import styles from "./users.module.css";
import userPhoto from "../../assets/images/v547828-288243584.jpg";
import React from "react";
import {UserType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export function Users(props: PropsType) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>

            {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small || userPhoto} alt=""/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    axios.delete('https://social-network.samuraijs.com/api/1.0/follow/' + u.id, {
                                        withCredentials: true,
                                        headers: {"API-KEY": "2f8b88ce-de54-4bd6-9153-b38ec847d28e"}
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    axios.post('https://social-network.samuraijs.com/api/1.0/follow/' + u.id, {}, {
                                        withCredentials: true,
                                        headers: {"API-KEY": "2f8b88ce-de54-4bd6-9153-b38ec847d28e"}
                                    }).then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
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
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p} </span>
            })}
        </div>
    )
}