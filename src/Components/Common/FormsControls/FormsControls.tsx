import React from "react";
import styles from './FormsControls.module.css'

export function Textarea({input, meta: {touched, error}, ...props}: any) {

    const hasError = touched && error

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div><textarea {...input} {...props} /></div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export function Input({input, meta: {touched, error}, ...props}: any) {

    const hasError = touched && error

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div><input {...input} {...props} /></div>
            {hasError && <span>{error}</span>}
        </div>
    )
}