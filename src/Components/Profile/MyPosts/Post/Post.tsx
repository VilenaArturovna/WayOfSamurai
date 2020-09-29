import React from 'react';
import styles from './Post.module.css';

type MessageType = {
    message: string
    likesCount: number
}

function Post(props: MessageType) {
    return (
        <div className={styles.item}>
            <img src="https://pbs.twimg.com/profile_images/378800000619398984/7bd4096c5e612dea658f2686d1bee6df.jpeg"
                 alt=""/>
            {props.message}
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;