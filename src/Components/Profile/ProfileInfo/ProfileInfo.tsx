import React from 'react';
import styles from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/store";
import {Preloader} from "../../Common/Preloader/Preloader";
import { NavLink, Link } from 'react-router-dom';

type PropsType = {
    profile: ProfileType
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div>
                    <img className={styles.img}
                         src={'https://get.wallhere.com/photo/landscape-Terrain-mountain-screenshot-computer-wallpaper-geological-phenomenon-extreme-sport-5120x1600-px-709770.jpg'}/>
                </div>
                <div className={styles.descriptionBlock}>
                    <img
                        src={props.profile.photos.large || ''}/>
                </div>
                <div className={styles.name}>
                    {props.profile.fullName}
                </div>
                <div className={styles.aboutMe}>
                    About me:
                    <div>
                        {props.profile.aboutMe}
                    </div>

                </div>
                <div>
                    <div>{'Looking for a job: ' + props.profile.lookingForAJob}</div>
                    {props.profile.lookingForAJob ? <div>{props.profile.lookingForAJobDescription}</div> : ''}
                </div>
                <div>
                    <img src="./../../../assets/images/facebook.svg" alt="facebook">{/*<Link to={props.profile.contacts.facebook || ''} ></Link>*/}</img>
                    <img src="../../../assets/images/website.svg" alt="website">{/*<a href={props.profile.contacts.website || ''}></a>*/}</img>
                    <img src="../../../assets/images/vk.svg" alt="vk">{/*<a href={props.profile.contacts.vk || ''}></a>*/}</img>
                    <img src="../../../assets/images/twitter_icon-icons.com_66093.svg" alt="twitter">{/*<a href={props.profile.contacts.twitter || ''}></a>*/}</img>
                    <img src="../../../assets/images/instagram_108043.svg" alt="instagram">{/*<a href={props.profile.contacts.instagram || ''}></a>*/}</img>
                    <img src="../../../assets/images/circle-youtube_icon-icons.com_66837.svg" alt="youtube">{/*<a href={props.profile.contacts.youtube || ''}></a>*/}</img>
                    <img src="../../../assets/images/github_icon-icons.com_65450.svg" alt="github">{/*<a href={props.profile.contacts.github || ''}></a>*/}</img>
                    <img src="../../../assets/images/mainLink.svg" alt="mainLink">{/*<a href={props.profile.contacts.mainLink || ''}></a>*/}</img>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;

