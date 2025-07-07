import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { CSS_ANIMATION_DURATION } from '@/shared/constants/cssAnimationDuration';

import ProfileActions from './ProfileActions';

import '@/shared/styles/shared.css';

type ProfilePropdownProps = {
    isOpen: boolean;
    username: string | null;
    email: string | null;
};

const ProfileDropdown = ({ isOpen, username, email }: ProfilePropdownProps) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            timeout={CSS_ANIMATION_DURATION}
            in={isOpen}
            nodeRef={nodeRef}
            classNames={'fade'}
            unmountOnExit
        >
            <article
                className='absolute right-4 bg-white shadow-sm rounded-md inset-shadow-sm z-10'
                ref={nodeRef}
            >
                <header className='border-b border-b-gray-300 px-4 py-3'>
                    <h2 className='text-base font-semibold'>
                        {username || 'Anonymous'}
                    </h2>
                    <address className='text-sm not-italic text-inactive opacity-80'>
                        {email}
                    </address>
                </header>

                <ProfileActions />
            </article>
        </CSSTransition>
    );
};

export default ProfileDropdown;
