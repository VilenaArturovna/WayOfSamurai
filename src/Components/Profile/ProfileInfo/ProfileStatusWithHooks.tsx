import React, {ChangeEvent, useEffect, useState} from 'react'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

function ProfileStatus(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {                   //перерисовывается, когда меняется статус, иначе иногда пустой инпут
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e:  ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode
                    ? <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
                    : <div><input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                                  value={status}/></div>
            }


        </div>
    )

}


export default ProfileStatus;

