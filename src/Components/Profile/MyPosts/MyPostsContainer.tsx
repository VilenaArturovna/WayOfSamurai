import React from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {ActionsTypes, RootStateType} from "../../../redux/store";
import {StoreType} from "../../../redux/redux-store";




let mapStateToProps = (state: RootStateType) => {

    return {
        posts: state.postsPage.posts,
        newPostText: state.postsPage.newPostText
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsTypes) => void) => {
    return {
        addPost () {
            dispatch(addPostAC())
        },

        onChangePost(text: string) {
            dispatch(updateNewPostTextAC(text))
        }
    }



}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;