import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AuthDataType, setAuthUserData} from "../../redux/authReducer";
import {RootStateType} from "../../redux/store";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    /*data: AuthDataType*/
}
type MapDispatchPropsType = {
    setAuthUserData: (data: AuthDataType) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true}).
        then(response => {
            if (response.data.resultCode === 0) {
                this.props.setAuthUserData(response.data.data)
            }
        })
    }

    render() {
        debugger
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    debugger
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
        /*data: state.auth*/
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)




