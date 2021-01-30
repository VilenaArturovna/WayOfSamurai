import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {

    isAuth: boolean
    login: string | null
    logout: () => void
}

export default function Header(props: PropsType) {
    return (
        <header className={styles.header}>
            <img alt={'wallpaper'}
                src="https://www.seekpng.com/png/full/402-4022115_some-logos-are-clickable-and-available-in-large.png"/>
            <div className={styles.loginBlock}>
                {props.isAuth ? <button onClick={props.logout}>Log out</button> :
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}




