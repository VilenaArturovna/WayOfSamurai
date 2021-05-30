import userPhoto from "../../assets/images/v547828-288243584.jpg";
import React from "react";
import {UserType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import style from './users.module.css'

type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

export function User(props: PropsType) {
    return (
        <div className={style.userItem}>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small || userPhoto} alt=""/>
                    </NavLink>
                </div>
                <div>
                    {props.user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                            props.unfollow(props.user.id)
                        }}>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                  onClick={() => {
                                      props.follow(props.user.id)
                                  }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span><div>{props.user.name}</div><div>{props.user.status}</div></span>
                <span><div>{'u.location.country'}</div><div>{'u.location.city'}</div></span>
            </span>
        </div>
    )
}