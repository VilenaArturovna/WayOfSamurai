import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsPageType} from './../../redux/state'

function Dialogs(props: DialogsPageType) {

    let dialogsElements = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.messages.map(mess => <Message message={mess.message}/>);

    let newMessage = React.createRef<HTMLTextAreaElement>();

    let addMessage = () => {
        let text = newMessage.current?.value;
        alert(text);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea ref={newMessage}></textarea>
                <button onClick={addMessage}>Submit</button>
            </div>

        </div>
    )
}

export default Dialogs;