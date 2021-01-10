import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostsType} from "../../../redux/store";
import {updateNewPostText} from "../../../redux/profileReducer";

type PropsType = {
    posts: Array<PostsType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
}

function MyPosts(props: PropsType) {

    let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = () => {
        props.addPost();
    };

    let onChangePost = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value;
            props.updateNewPostText(text)
        }
    }

    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onChangePost} value={props.newPostText}/>
                </div>
                <button onClick={onAddPost}>Add post</button>
                <button>Remove</button>
                <div className={styles.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;