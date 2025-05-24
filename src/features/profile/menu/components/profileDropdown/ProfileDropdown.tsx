import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { fadeTransitionClassNames } from '../../../../../shared/constants/fadeTransitionClassNames';
import { CSS_ANIMATION_DURATION } from '../../../../../shared/constants/cssAnimationDuration';


import ProfileOption  from '../ProfileOption';

import styles from './profileDropdown.module.css';


type ProfilePropdownProps = {
    isOpen: boolean,
    username: string | null,
    email: string | null,
}

const ProfileDropdown = ({isOpen, username, email}: ProfilePropdownProps) => {

    const nodeRef = useRef(null);

    return (

        <CSSTransition 
            timeout={CSS_ANIMATION_DURATION} 
            in={isOpen} 
            nodeRef={nodeRef}
            classNames={fadeTransitionClassNames}  
            unmountOnExit
            >

            <article 
                className={styles.card}
                ref={nodeRef}
            >

                <header className={styles.header}>
                    <h2 className='text-base font-semibold'>{username || 'Anonymous'}</h2>
                    <address className={styles.email}>{email}</address>
                </header>

                <ProfileOption />

            </article>

        </CSSTransition>

    )

}

export default ProfileDropdown;