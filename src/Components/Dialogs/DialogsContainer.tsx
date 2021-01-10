import React from 'react';
import {sendMessage, updateNewMessageText} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DialogsPageType, RootStateType} from "../../redux/store";

type MapStatePropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}


const DialogsContainer = connect(mapStateToProps, {updateNewMessageText, sendMessage})(Dialogs)


export default DialogsContainer;