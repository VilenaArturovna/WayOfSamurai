import React, {ChangeEvent} from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
    ActionsTypes,
    DialogsPageType,
    DialogsType,
    MessagesType,
    sendMessageAC,
    updateNewMessageTextAC
} from './../../redux/state'

type PropsType = {
    dialogsPage: DialogsPageType
    /*messages: MessagesType
    newMessageText: string*/
    dispatch: (action: ActionsTypes) => void
}

function Dialogs(props: PropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.dialogsPage.messages.map(mess => <Message message={mess.message}/>);

    let newMessage = React.createRef<HTMLTextAreaElement>();

    let onSendMessageClick = () => {
        props.dispatch(sendMessageAC())
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;
        props.dispatch(updateNewMessageTextAC(text))
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
            </div>
            <div>
                <textarea value={props.dialogsPage.newMessageText} ref={newMessage} placeholder={'Enter your message'} onChange={onNewMessageChange}/>
                <button onClick={onSendMessageClick}>Submit</button>
            </div>

        </div>
    )
}

export default Dialogs;