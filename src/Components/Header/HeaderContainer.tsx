import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AuthDataType, setAuthUserData} from "../../redux/authReducer";
import {RootStateType} from "../../redux/store";
import {authAPI} from "../../api/api";

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
        authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                this.props.setAuthUserData(data.data)
            }
        })
    }

    render() {

        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
        /*data: state.auth*/
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)




