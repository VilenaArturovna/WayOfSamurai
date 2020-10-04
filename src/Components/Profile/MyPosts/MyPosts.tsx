import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {
    ActionsTypes,
    addPostActionCreator,
    AddPostActionType,
    PostsType, updateNewPostTextActionCreator,
    UpdateNewPostTextActionType
} from "../../../redux/state";

type NewPostType = {
    posts: Array<PostsType>
    dispatch: (action: ActionsTypes) => void
    newPostText: string
}

function MyPosts(props: NewPostType) {

    let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        //props.addPost();
        props.dispatch(addPostActionCreator())
    };

    let onChangePost = () => {
        if(newPostElement.current) {
            let text = newPostElement.current.value;
            //props.updateNewPostText(text)
            props.dispatch(updateNewPostTextActionCreator(text))
        }
    }

    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onChangePost} value={props.newPostText}/>
                </div>
                <button onClick={addPost}>Add post</button>
                <button>Remove</button>
                <div className={styles.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;