import React from 'react';
import styles from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, PostsPageType} from './../../redux/state';

type NewPostType = {
    postsPage: PostsPageType
    dispatch: (action: ActionsTypes) => void
}

function Profile(props: NewPostType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.postsPage.posts} newPostText={props.postsPage.newPostText} dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile;

