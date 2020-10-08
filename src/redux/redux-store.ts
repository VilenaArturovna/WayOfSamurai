import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

const reducers = combineReducers({
    postsPage: profileReducer,
    dialogsPage: dialogsReducer
})

let store = createStore(reducers)

export default store