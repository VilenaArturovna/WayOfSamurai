import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow,
    UsersType,
    UserType
} from "../../redux/UsersReducer";
import {RootStateType} from "../../redux/store";
import {Users} from "./Users";
import {Preloader} from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType, any> {
    /*constructor(props: PropsType) {
        super(props);
    }*/

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            }
        )
    }

    render = () => {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
                      currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                      pageSize={this.props.pageSize} totalUsersCount={this.props.totalUsersCount}/>
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
    }
}
/*
const mapDispatchToProps = (dispatch: (action: UsersActionsTypes) => void) => {
    return {
        follow: (userId: number) => {
            dispatch(follow(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollow(userId))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsers(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPage(currentPage))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCount(totalUsersCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetching(isFetching))
        }
    }
}
*/

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching}) (UsersContainer)