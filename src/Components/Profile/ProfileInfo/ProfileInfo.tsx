import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../redux/store";
import {Preloader} from "../../Common/Preloader/Preloader";
import mountain from "../../../assets/images/landscape-mountain.jpg"
import ProfileStatus from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/v547828-288243584.jpg";
import {ProfileDataForm} from "./ProfileDataForm";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean   //является владельцем?
    savePhoto: (file: any) => void
}

function ProfileInfo(props: PropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img className={styles.img} alt={'123'}
                     src={mountain}/>
            </div>
            <div className={styles.descriptionBlock}>
                <img alt={'ProfilePhoto'}
                     src={props.profile.photos.large || userPhoto}/>
            </div>
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            <div className={styles.status}>
                Status:
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
            {/*{editMode ? <ProfileDataForm goToEditForm={() => ''} profile={props.profile} isOwner={props.isOwner}/> :
                <ProfileData goToEditForm={() => setEditMode(true)} profile={props.profile} isOwner={props.isOwner}/>}*/}

        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact = (props: ContactPropsType) => {
    return (
        <div><a href={props.contactValue || ''}>{props.contactTitle}</a></div>
    )
}
export type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditForm: () => void
}

const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <div>
            {props.isOwner && <button onClick={props.goToEditForm}>Edit Profile</button>}
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
                <div>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</div>
                {props.profile.lookingForAJob &&
                <div>My professionals skills: {props.profile.lookingForAJobDescription}</div>}
            </div>
            {/*Contacts*/}
            <div>
                Contacts: {Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key}
                                contactValue={props.profile.contacts[key as keyof ContactsType]}/>
            })}
                {/*<Link to={props.profile.contacts.facebook || ''}>
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
                </Link>*/}
            </div>
        </div>
    )
}

export default ProfileInfo;

