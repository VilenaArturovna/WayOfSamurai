import React from 'react';
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsReducer";
import {StoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";

type PropsType = {
    store: StoreType
}

function DialogsContainer(props: PropsType) {

    let state = props.store.getState().dialogsPage

    const dispatch = props.store.dispatch.bind(props.store)

    let onSendMessageClick = () => {
        dispatch(sendMessageAC())
    }

    let onNewMessageChange = (text: string) => {
        dispatch(updateNewMessageTextAC(text))
    }

    return <Dialogs dialogsPage={state}
                    onSendMessageClick={onSendMessageClick}
                    onNewMessageChange={onNewMessageChange}/>
}

export default DialogsContainer;