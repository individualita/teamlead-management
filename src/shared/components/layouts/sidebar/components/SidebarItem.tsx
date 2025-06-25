
import { NavLink } from 'react-router-dom';

//type
import { SidebarLink } from '../types';

type SidebarItemProps = {
    link: SidebarLink,
    isOpen: boolean
}

const SidebarItem = ({link, isOpen}: SidebarItemProps) => {

    const ACTIVE_LINK_CLASS = 'text-primary font-bold bg-stone-100 rounded-md';
    const INACTIVE_LINK_CLASS = 'text-inactive';

    return (

        <li className='flex gap-1 items-center rounded-sm cursor-pointer'>

            <NavLink 
                to={link.path} 
                className={({ isActive }) =>
                    `${'flex items-center gap-3 w-full px-1 py-2 hover-fade'} ${isActive ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS}`
                }
            >
                    <link.icon className='min-w-6 min-h-6' />
                    {isOpen && <span className='hidden md:block' >{link.name}</span>}

            </NavLink>
            
        </li>
    )
}

export default SidebarItem;