import { useState, useEffect, useRef} from 'react';


//local components
import Avatar from './components/avatar/Avatar';
import ProfileDropdown from './components/profileDropdown/ProfileDropdown';


const ProfileMenu = () => {

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

        if(!isOpenProfileMenu) return; 

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [isOpenProfileMenu]);



    return (
        <div  className='relative' ref={profileRef}>

            <div className='w-11 h-11 cursor-pointer' onClick={toggleOpen}>
                <Avatar src={'https://material-kit-react.devias.io/assets/avatar.png'}/>
            </div>

            <ProfileDropdown isOpen={isOpenProfileMenu}/>


        </div>
    )
}

export default ProfileMenu