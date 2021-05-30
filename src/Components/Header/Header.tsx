import React from 'react';
import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';
import socialIcon from './../../assets/images/network.svg'

type PropsType = {

    isAuth: boolean
    login: string | null
    logout: () => void
}

export default function Header(props: PropsType) {
    return (
        <header className={styles.header}>
            <img alt={'wallpaper'}
                src={socialIcon}/>
            <div className={styles.loginBlock}>
                {props.isAuth ? <button onClick={props.logout}>Log out</button> :
                <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}




