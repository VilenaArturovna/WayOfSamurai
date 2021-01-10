import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setProfile} from "../../redux/profileReducer";
import {ProfileType, RootStateType} from "../../redux/store";
import {RouteComponentProps, withRouter} from 'react-router-dom';

type MapStatePropsType = {
    profile: ProfileType
}
type MapDispatchPropsType = {
    setProfile: (profile: ProfileType) => void
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userID).then(response => {
                this.props.setProfile(response.data)
            }
        )
    }

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({profile: state.postsPage.profile})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect (mapStateToProps, {setProfile})(WithUrlDataContainerComponent);

