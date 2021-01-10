import React from 'react';
import {addPost, updateNewPostText} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {PostsType, RootStateType} from "../../../redux/store";

type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
}
type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}

let mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        posts: state.postsPage.posts,
        newPostText: state.postsPage.newPostText
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost, updateNewPostText})(MyPosts)

export default MyPostsContainer;