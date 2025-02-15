import { useRef } from 'react';

import ProfileOption  from '../profileOption/ProfileOption';

import { Transition } from 'react-transition-group';

import styles from './profileDropdown.module.css';


type ProfilePropdownProps = {
    isOpen: boolean,
}

const ProfileDropdown = ({isOpen}: ProfilePropdownProps) => {

    const nodeRef = useRef(null);

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
        unmounted: {opacity: 0}
    };

    return (

        <Transition timeout={duration} in={isOpen} nodeRef={nodeRef} unmountOnExit>
            {state => (

                <article 
                    style={{...defaultStyle, ...transitionStyles[state]}} 
                    className={styles.card}
                    ref={nodeRef}
                >

                    <header className={styles.header}>
                        <h2 className='text-base font-semibold'>Sofia Rivers</h2>
                        <address className={styles.email}>randomemail@gmail.com</address>
                    </header>

                    <ProfileOption />

                </article>

            )}

        </Transition>

    )

}

export default ProfileDropdown;