import React, {ChangeEvent} from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsPageType} from '../../redux/store'
import { Redirect } from 'react-router-dom';


type PropsType = {
    dialogsPage: DialogsPageType
    sendMessage: () => void
    updateNewMessageText: (text: string) => void
    isAuth: boolean
}

function Dialogs(props: PropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.dialogsPage.messages.map(mess => <Message message={mess.message}/>);

    let newMessage = React.createRef<HTMLTextAreaElement>();

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;
        props.updateNewMessageText(text)
    }

    if (!props.isAuth)  return <Redirect to={'/login'} />

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
            </div>
            <div>
                <textarea value={props.dialogsPage.newMessageText} ref={newMessage} placeholder={'Enter your message'}
                          onChange={onNewMessageChange}/>
                <button onClick={props.sendMessage}>Submit</button>
            </div>

        </div>
    )
}

export default Dialogs;