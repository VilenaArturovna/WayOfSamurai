import React from "react";
import {UserType} from "../../redux/UsersReducer";
import {Paginator} from "../../utils/Paginator/Paginator";
import {User} from "./User";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

export function Users(props: PropsType) {
    return (
        <div>
            {props.users.map(u => <div key={u.id}>
                <User user={u} follow={props.follow} unfollow={props.unfollow}
                      followingInProgress={props.followingInProgress}/>
            </div>)
            }
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged} portionSize={10}/>
        </div>
    )
}