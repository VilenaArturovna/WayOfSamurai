import React from 'react';
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {StoreType} from "../../../redux/redux-store";

type NewPostType = {
    store: StoreType
}

function MyPostsContainer(props: NewPostType) {

    let state = props.store.getState().postsPage

    let dispatch = props.store.dispatch.bind(props.store)

    let addPost = () => {
        dispatch(addPostAC())
    };

    let onChangePost = (text: string) => {
        dispatch(updateNewPostTextAC(text))
    }

    return (
        <MyPosts updateNewPostText={onChangePost}
                 addPost={addPost}
                 posts={state.posts}
                 newPostText={state.newPostText}/>
    )
}

export default MyPostsContainer;