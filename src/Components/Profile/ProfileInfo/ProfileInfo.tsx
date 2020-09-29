import React from 'react';
import styles from './ProfileInfo.module.css';

function ProfileInfo() {
    return (
        <div>
            <div>
                <img className={styles.img}
                     src='https://get.wallhere.com/photo/landscape-Terrain-mountain-screenshot-computer-wallpaper-geological-phenomenon-extreme-sport-5120x1600-px-709770.jpg'/>
            </div>
            <div className={styles.descriptionBlock}>
                ava + description
            </div>

        </div>
    )
}

export default ProfileInfo;