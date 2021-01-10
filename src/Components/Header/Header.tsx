import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {AuthDataType} from "../../redux/authReducer";

type PropsType = {
   /* data: AuthDataType*/
    isAuth: boolean
    login: string | null
}

export default function Header(props: PropsType) {
    return (
        <header className={styles.header}>
            <img
                src="https://www.seekpng.com/png/full/402-4022115_some-logos-are-clickable-and-available-in-large.png"/>
            <div className={styles.loginBlock}>
                {props.isAuth ? props.login :
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}




