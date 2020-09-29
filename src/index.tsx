import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import state, {addPost, RootStateType} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";


    ReactDOM.render(
        <React.StrictMode>
            <App appState={state} addPost={addPost}/>
        </React.StrictMode>,
        document.getElementById('root')
    );






// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
