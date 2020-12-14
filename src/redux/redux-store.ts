import {CombinedState, combineReducers, createStore, Store} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {ActionsTypes, DialogsPageType, PostsPageType} from "./store";
import {usersReducer} from "./UsersReducer";

const reducers = combineReducers({
    postsPage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
})

let store = createStore(reducers)

export type StoreType = Store<CombinedState<{ postsPage: PostsPageType; dialogsPage: DialogsPageType; }>, ActionsTypes>

export default store