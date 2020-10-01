import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Settings from "./Components/Settings/Settings";
import {RootStateType} from "./redux/state";

type PropsType = {
    appState: RootStateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

function App(props: PropsType) {

        return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs dialogs={props.appState.dialogsPage.dialogs} messages={props.appState.dialogsPage.messages}/>}/>
                    <Route path='/profile' render={() => <Profile postsPage={props.appState.postsPage} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>} />
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;