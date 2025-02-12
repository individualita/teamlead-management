import ProfileOption  from './ProfileOption';

import { Transition } from 'react-transition-group';


type ProfilePropdownProps = {
    isOpen: boolean,
}

const ProfileDropdown = ({isOpen}: ProfilePropdownProps) => {

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

        <Transition timeout={duration} in={isOpen} unmountOnExit>
            {state => (

                <div 
                    style={{...defaultStyle, ...transitionStyles[state]}} 
                    className='absolute right-4 bg-white shadow-sm rounded-md inset-shadow-sm'
                >

                    <div className='border-b border-b-gray-300 px-4 py-3'>
                        <div className='name text-base font-semibold'>Sofia Rivers</div>
                        <div className='email text-gray-500 text-sm'>randomemail@gmail.com</div>
                    </div>

                    <ProfileOption />

                </div>

            )}

        </Transition>

    )

}

export default ProfileDropdown;