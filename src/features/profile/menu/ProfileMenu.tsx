import { useState, useEffect, useRef } from 'react';

//store
import { useAuthUser } from '../../../shared/stores/authStore';

//local components
import Avatar from '../../../shared/components/Avatar';
import ProfileDropdown from './components/profileDropdown/ProfileDropdown';

const ProfileMenu = () => {
    const user = useAuthUser();

    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
    const toggleOpen = () => setIsOpenProfileMenu(prev => !prev);

    const profileRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        //клие не внутри
        if (!profileRef.current?.contains(e.target as Node)) {
            setIsOpenProfileMenu(false);
        }
    };

    useEffect(() => {
        if (!isOpenProfileMenu) return;

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpenProfileMenu]);

    if (!user) return <div>No user</div>;

    return (
        <div className='relative' ref={profileRef}>
            <div
                className='w-10 h-10 cursor-pointer flex justify-center items-center'
                onClick={toggleOpen}
            >
                <Avatar src={user.photoURL} username={user.username} />
            </div>

            <ProfileDropdown
                isOpen={isOpenProfileMenu}
                username={user.username}
                email={user.email}
            />
        </div>
    );
};

export default ProfileMenu;
