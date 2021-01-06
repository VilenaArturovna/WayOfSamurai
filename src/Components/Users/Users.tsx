import styles from "./users.module.css";
import userPhoto from "../../assets/images/v547828-288243584.jpg";
import React from "react";
import {UserType} from "../../redux/UsersReducer";

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
            {pages.map(p => {
                return <span className={props.currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p} </span>
            })}
            {props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small || userPhoto} alt=""/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
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