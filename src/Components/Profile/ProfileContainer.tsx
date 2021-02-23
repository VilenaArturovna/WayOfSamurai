import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {getProfile, getStatus, savePhoto, updateStatus} from "../../redux/profileReducer";
import {ProfileType, RootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';

type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
}
type ParamsType = {
    userId: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<ParamsType>

class ProfileContainer extends React.Component<PropsType, any> {

    refreshProfile() {
        let userID: number | null = +this.props.match.params.userId
        if (!userID) {
            userID = this.props.authorizedUserId
            if (!userID) {
                this.props.history.push('login')
            }
        }
        this.props.getProfile(userID)
        this.props.getStatus(userID)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return <Profile isOwner={!this.props.match.params.userId} profile={this.props.profile}
                        status={this.props.status} updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
)

export default compose<React.ComponentType>(connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    /*withAuthRedirect*/)
(ProfileContainer)