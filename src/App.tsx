import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import {RootStateType} from "./redux/store";
import {Preloader} from "./Components/Common/Preloader/Preloader";

type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType

class App extends React.Component<PropsType, any> {

    componentDidMount() {
        debugger
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader />

        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
    (App);
