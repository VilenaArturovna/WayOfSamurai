import React from 'react';
import styles from './../Dialogs.module.css';

type MessageType = {
    message: string
}

function Message(props: MessageType) {
    return (
        <div className={styles.message}>{props.message}</div>
    )
}

export default Message;