import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { GoPeople } from 'react-icons/go';
import { FaChartColumn } from 'react-icons/fa6';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';


import { SidebarLink } from '../types/sidebar.types';





export const SIDEBAR_LINKS: SidebarLink[] = [
    {
        icon: HiOutlineSquares2X2 ,
        name: 'Home',
        path: '/home'
    },

    {
        icon: GoPeople,
        name: 'Employees',
        path: '/employees'
    },

    {
        icon: FaChartColumn,
        name: 'Daily activity',
        path: '/activity'
    },
    {
        icon: HiOutlineChatBubbleLeftEllipsis,
        name: 'Chat',
        path: '/chat'
    },

    
]