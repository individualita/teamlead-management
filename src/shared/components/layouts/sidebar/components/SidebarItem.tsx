
import { NavLink } from 'react-router-dom';
import { SidebarLink } from '../types/sidebar.types';

import styles from './sideBarItem.module.css';


type SidebarItemProps = {
    link: SidebarLink,
    isOpen: boolean
}

const SidebarItem = ({link, isOpen}: SidebarItemProps) => {
    
    return (

        <li className={styles.item}>

            <NavLink 
                to={link.path} 
                className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive :''}`
                }
            >
                    <link.icon className='min-w-6 min-h-6' />
                    {isOpen && <span >{link.name}</span>}

            </NavLink>
            
        </li>
    )
}

export default SidebarItem;