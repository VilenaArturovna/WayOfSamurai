import React from 'react';
import {Redirect} from "react-router-dom";
import {RootStateType} from "../redux/store";
import {connect} from "react-redux";

type MapStateForRedirectPropsType = {
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state: RootStateType): MapStateForRedirectPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect =(Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}