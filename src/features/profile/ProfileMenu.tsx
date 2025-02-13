import { useState} from 'react';

//local components
import Avatar from './components/avatar/Avatar';
import ProfileDropdown from './components/profileDropdown/ProfileDropdown';


const ProfileMenu = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleOpen = () => setIsOpenMenu(prev => !prev);


    return (
        <div className='relative'>

            <div className='w-11 h-11 cursor-pointer' onClick={toggleOpen}>
                <Avatar src={'https://material-kit-react.devias.io/assets/avatar.png'}/>
            </div>

            <ProfileDropdown isOpen={isOpenMenu}/>

        </div>
    )
}

export default ProfileMenu