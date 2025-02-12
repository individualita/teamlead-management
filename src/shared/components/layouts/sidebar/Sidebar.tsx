import { SIDEBAR_LINKS } from "./constants/sidebarLinks";
import SidebarItem from "./SidebarItem";


import styles from './sidebar.module.css';



const Sidebar = () => {
    return (
        <aside className={styles.sidebar}
>
            <nav className='text-base'>

                <ul className='flex flex-col gap-3'>

                    {SIDEBAR_LINKS.map(link => (
                        <SidebarItem key={link.name} link={link}/>
                    ))}

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;