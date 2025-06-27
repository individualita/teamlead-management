import { useState } from 'react';
import { RxDoubleArrowLeft } from "react-icons/rx";

//constants
import { SIDEBAR_LINKS } from './constants/sidebarLinks';

//components
import SidebarItem from './components/SidebarItem';


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <aside className={`
            flex flex-col gap-5 shrink-0 min-w-[60px] py-4 px-2 transition-[width] duration-400 ease-in-out will-change-[width] w-full border-r-0
            md:border-r-2 md:border-r-gray-100 
            ${isSidebarOpen ? 'md:w-[220px]' : 'md:w-[60px]'}
        `}>           
            <button 
                onClick={() =>setIsSidebarOpen(prev => !prev)}
                className={`
                    hidden
                    md:block md:cursor-pointer md:p-2 md:hover:bg-gray-200 md:self-end md:transition-all md:duration-400 md:ease-in-out 
                    ${isSidebarOpen? 'rotate-0': '-rotate-180'}
                `}
                >
                    <RxDoubleArrowLeft />
            </button>

            <nav>
                <ul className={`
                    flex flex-row justify-between
                    md:flex md:flex-col md:gap-2 
                    ${isSidebarOpen? '': 'items-end'}
                `}>

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

