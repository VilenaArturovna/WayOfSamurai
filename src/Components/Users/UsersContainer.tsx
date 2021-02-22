import React from "react";
import {connect} from "react-redux";
import {follow, getUsersTC, onPageChangedTC, unfollow, UserType} from "../../redux/UsersReducer";
import {RootStateType} from "../../redux/store";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/UsersSelectors";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    onPageChangedTC: (pageNumber: number, pageSize: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersTC(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.onPageChangedTC(pageNumber, pageSize)
    }

    render = () => {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
                   currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                   pageSize={this.props.pageSize} totalUsersCount={this.props.totalUsersCount}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps,
    {follow, unfollow, getUsersTC, onPageChangedTC}))
(UsersContainer)