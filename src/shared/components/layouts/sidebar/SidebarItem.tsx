
import { NavLink } from 'react-router-dom';
import { SidebarLink } from './types/sidebar.types';


type SidebarItemProps = {
    link: SidebarLink,
}

const SidebarItem = ({link}: SidebarItemProps) => {

    return (
        <li className='px-1 py-3 flex gap-1 items-center rounded-sm hover:bg-stone-50 cursor-pointer'>

        <NavLink to={link.path} className='flex items-center gap-3 w-full'>
                <link.icon className='w-6 h-6' />
                <span >{link.name}</span>
            </NavLink>
            
        </li>
    )
}

export default SidebarItem;