export const PAGE_TITLES = {
    '/home': 'Home',
    '/employees': 'Employees',
    '/activity': 'Daily activity',
    '/chat': 'Chat'
} as const;

export type RoutePath = keyof typeof PAGE_TITLES;