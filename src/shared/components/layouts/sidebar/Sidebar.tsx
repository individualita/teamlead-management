import { useState } from 'react';
import { RxDoubleArrowLeft } from "react-icons/rx";

import { SIDEBAR_LINKS } from './constants/sidebarLinks';

import SidebarItem from './components/SidebarItem';


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <aside className={`flex flex-col gap-5 shrink-0 min-w-[60px] py-4 px-2 transition-[width] duration-400 ease-in-out will-change-[width] border-r-2 border-r-gray-100 ${isSidebarOpen? 'w-[220px]': 'w-[60px]'}`}>           
            <button 
                onClick={() =>setIsSidebarOpen(prev => !prev) }
                className={`cursor-pointer p-2 hover:bg-gray-200 self-end transition-all duration-400 ease-in-out ${isSidebarOpen? 'rotate-0': '-rotate-180'}`}
                >
                    <RxDoubleArrowLeft />
            </button>

            <nav>

                <ul className={`flex flex-col gap-2 ${isSidebarOpen? '': 'items-end'}`}>

                    {SIDEBAR_LINKS.map(link => (
                        <SidebarItem 
                            key={link.name} 
                            link={link} 
                            isOpen={isSidebarOpen}
                        />
                    ))}

                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;

