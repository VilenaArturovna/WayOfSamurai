import React from "react";
import {connect} from "react-redux";
import {follow, getUsersTC, onPageChangedTC, unfollow, UserType} from "../../redux/UsersReducer";
import {RootStateType} from "../../redux/store";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

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
    /*constructor(props: PropsType) {
        super(props);
    }*/

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }


    onPageChanged = (pageNumber: number) => {
        this.props.onPageChangedTC(pageNumber,this.props.pageSize)
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {follow, unfollow, getUsersTC, onPageChangedTC}), withAuthRedirect)
(UsersContainer)