import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {NewPostType} from "../Profile";

function MyPosts(props: NewPostType) {

    let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPost = () => {
        if(newPostElement.current) {
            let text = newPostElement.current.value;
            props.addPost(text);
            newPostElement.current.value = '';
        }


    };
    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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