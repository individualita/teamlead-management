import { SidebarLink } from '../types/sidebar.types';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { GoPeople } from 'react-icons/go';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiBarChart } from 'react-icons/fi';






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
        icon: FiBarChart,
        name: 'Daily activity',
        path: '/activity'
    },
    {
        icon:  HiOutlineChatBubbleLeftEllipsis, 
        name: 'Chat',
        path: '/chat'
    },

    {
        icon: IoSettingsOutline,
        name: 'Settings',
        path: '/settings'
    }


    
]
