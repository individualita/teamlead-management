export const ROUTES = {
    SIGN_IN: {
        path: '/sign-in',
        title: 'Sign In',
    },
    SIGN_UP: {
        path: '/sign-up',
        title: 'Sign Up',
    },
    HOME: {
        path: '/home',
        title: 'Home',
    },
    EMPLOYEES: {
        path: '/employees',
        title: 'Employees'
    },
    EMPLOYEES_PROFILE: {
        path: '/employee/:employeeId',
        title: ''
    },
    ACTIVITY: {
        path: '/activity',
        title: 'Daily Activity'
    },
    CHAT: {
        path: '/chat',
        title: 'Chat'
    },
    SETTINGS: {
        path: '/settings',
        title: 'Settings'
    }

} as const;