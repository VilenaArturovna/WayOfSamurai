import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {getProfile, getStatus, updateStatus} from "../../redux/profileReducer";
import {ProfileType, RootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from 'redux';

type MapStatePropsType = {
    profile: ProfileType
    status: string
}
type MapDispatchPropsType = {
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
type ParamsType = {
    userId: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<ParamsType>

class ProfileContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        let userID = this.props.match.params.userId
        if (!userID) {
            userID = "2"
        }
        this.props.getProfile(userID)
        this.props.getStatus(userID)
    }

    render() {

        return <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({profile: state.profilePage.profile, status: state.profilePage.status})

export default compose<React.ComponentType>(connect (mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter,
    /*withAuthRedirect*/)
    (ProfileContainer)