import React from 'react';
import styles from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsPageType, PostsType} from './../../redux/state';

type NewPostType = {
    postsPage: PostsPageType
    addPost: () => void
    updateNewPostText: (newText: string) => void

}

function Profile(props: NewPostType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.postsPage.posts} newPostText={props.postsPage.newPostText} addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    )
}

export default Profile;

