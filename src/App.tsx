import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {HashRouter, Route, withRouter} from 'react-router-dom';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import {RootStateType} from "./redux/store";
import {Preloader} from "./Components/Common/Preloader/Preloader";
//ленивая загрузка
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

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
        if (!this.props.initialized) return <Preloader/>

        return (
            <HashRouter >
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={() => {
                            return <Suspense fallback={<Preloader />}>
                                <DialogsContainer/>
                            </Suspense>
                        }}/>
                        <Route path='/profile/:userId?'
                               render={() => {
                                   return <Suspense fallback={<Preloader />}>
                                       <ProfileContainer/>
                                   </Suspense>
                               }}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => {
                            return <Suspense fallback={<Preloader />}>
                                <UsersContainer/>
                            </Suspense>
                        }}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
            </HashRouter>
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
