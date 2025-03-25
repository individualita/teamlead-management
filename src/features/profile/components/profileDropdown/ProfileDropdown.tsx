import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { fadeTransitionClassNames } from '../../../../shared/constants/fadeTransitionClassNames';
import { CSS_ANIMATION_DURATION } from '../../../../shared/constants/cssAnimationDuration';

import ProfileOption  from '../profileOption/ProfileOption';

import styles from './profileDropdown.module.css';


type ProfilePropdownProps = {
    isOpen: boolean,
}

const ProfileDropdown = ({isOpen}: ProfilePropdownProps) => {

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
                    <h2 className='text-base font-semibold'>Sofia Rivers</h2>
                    <address className={styles.email}>randomemail@gmail.com</address>
                </header>

                <ProfileOption />

            </article>

        </CSSTransition>

    )

}

export default ProfileDropdown;