import React from 'react';
import styles from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/store";
import {Preloader} from "../../Common/Preloader/Preloader";
import {Link} from 'react-router-dom';
import mountain from "../../../assets/images/landscape-mountain.jpg"
import facebook from "./../../../assets/images/facebook.svg"
import website from "../../../assets/images/website.svg"
import vk from "../../../assets/images/vk.svg"
import twitter from "../../../assets/images/twitter_icon-icons.com_66093.svg"
import instagram from "../../../assets/images/instagram_108043.svg"
import youtube from "../../../assets/images/circle-youtube_icon-icons.com_66837.svg"
import github from "../../../assets/images/github_icon-icons.com_65450.svg"
import mainlink from "../../../assets/images/mainLink.svg"
import ProfileStatus from "./ProfileStatus";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}

function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                <div>
                    <img className={styles.img} alt={'123'}
                         src={mountain}/>
                </div>
                <div className={styles.descriptionBlock}>
                    <img alt={'ProfilePhoto'}
                         src={props.profile.photos.large || ''}/>
                </div>
                <div className={styles.name}>
                    {props.profile.fullName}
                </div>
                <div className={styles.status}>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
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
                    <Link to={props.profile.contacts.facebook || ''}>
                        <img src={facebook} alt="facebook" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.website || ''}>
                        <img src={website} alt="website" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.vk || ''}>
                        <img src={vk} alt="vk" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.twitter || ''}>
                        <img src={twitter} alt="twitter" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.instagram || ''}>
                        <img src={instagram} alt="instagram" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.youtube || ''}>
                        <img src={youtube} alt="youtube" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.github || ''}>
                        <img src={github} alt="github" className={styles.imgContact}/>
                    </Link>
                    <Link to={props.profile.contacts.mainLink || ''}>
                        <img src={mainlink} alt="mainLink" className={styles.imgContact}/>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;

