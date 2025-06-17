import { ROUTES } from '../constants/routes';

export const getRouteTitle = (path: string): string => {
    const route = Object.values(ROUTES).find(route => route.path === path);

    return route?.title ||  'Page not found';
};
