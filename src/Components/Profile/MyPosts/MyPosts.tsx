import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";

import {PostsType} from "../../../redux/state";

type NewPostType = {
    posts: Array<PostsType>
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void

}

function MyPosts(props: NewPostType) {

    let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
            props.addPost();
    };

    let onChangePost = () => {
        if(newPostElement.current) {
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