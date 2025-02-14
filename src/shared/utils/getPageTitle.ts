import { PAGE_TITLES, RoutePath } from '../constants/pageTitles';

export const getPageTitle = (path: string): string => {
    return PAGE_TITLES[path as RoutePath] || 'Home';
}