import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsPageType} from '../../redux/store'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {sendMessage} from "../../redux/dialogsReducer";
import {Textarea} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";


type PropsType = {
    dialogsPage: DialogsPageType
    sendMessage: (newMessageText: string) => void
    isAuth: boolean
}

function Dialogs(props: PropsType) {

    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = props.dialogsPage.messages.map(mess => <Message message={mess.message}/>);

    let addNewMessage = (values: FormDataType) => {
        debugger
        sendMessage(values.newMessageText)
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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}

type FormDataType = {
    newMessageText: string
}

const maxLength20 = maxLengthCreator(20)

function AddMessageForm(props: InjectedFormProps<FormDataType>) {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'} validate={[requiredField, maxLength20]}/>

            <button>Submit</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<FormDataType>({form: 'AddMessageForm'})(AddMessageForm)


export default Dialogs;