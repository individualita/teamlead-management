import { useState } from 'react';
import { SIDEBAR_LINKS } from './constants/sidebarLinks';
import SidebarItem from './components/SidebarItem';

import styles from './sidebar.module.css';


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <aside className={`${styles.sidebar} ${isSidebarOpen? 'w-[260px]': 'w-[60px]'}`}
>           
            <button onClick={() =>setIsSidebarOpen(prev => !prev) }>toggle test</button>
            <nav className='text-base'>

                <ul className={`flex flex-col gap-3 ${isSidebarOpen? '': 'items-end'}`}>

                    {SIDEBAR_LINKS.map(link => (
                        <SidebarItem key={link.name} link={link} isOpen={isSidebarOpen}/>
                    ))}

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;


/* 
ul {
    align-items: flex-end;

}
*/