import React from 'react';
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ActionsTypes, RootStateType} from "../../redux/store";
import {StoreType} from "../../redux/redux-store";


let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsTypes) => void) => {
    return {
        onNewMessageChange: (text: string) => {
            dispatch(updateNewMessageTextAC(text))
        },
        onSendMessageClick: () => {
            dispatch(sendMessageAC())
        }
    }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


export default DialogsContainer;