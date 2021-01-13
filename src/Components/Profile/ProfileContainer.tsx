import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profileReducer";
import {ProfileType, RootStateType} from "../../redux/store";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

type MapStatePropsType = {
    profile: ProfileType
    isAuth: boolean
}
type MapDispatchPropsType = {
    getProfile: (userId: string) => void
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
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'} />
        return <Profile profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({profile: state.postsPage.profile, isAuth: state.auth.isAuth})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect (mapStateToProps, {getProfile})(WithUrlDataContainerComponent);

