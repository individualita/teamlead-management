import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { GoPeople } from 'react-icons/go';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';

import { ROUTES } from '../../../../../shared/constants/routes';

import { SidebarLink } from '../types';


export const SIDEBAR_LINKS: SidebarLink[] = [
    {
        icon: HiOutlineSquares2X2 ,
        name: ROUTES.HOME.title,
        path: ROUTES.HOME.path,
    },

    {
        icon: GoPeople,
        name: ROUTES.EMPLOYEES.title,
        path: ROUTES.EMPLOYEES.path,
    },

    {
        icon:  HiOutlineChatBubbleLeftEllipsis, 
        name: ROUTES.CHAT.title,
        path: ROUTES.CHAT.path,
    },

    {
        icon: IoSettingsOutline,
        name: ROUTES.SETTINGS.title,
        path: ROUTES.SETTINGS.path,
    }

]
