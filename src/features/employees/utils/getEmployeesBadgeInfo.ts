interface EmployeeBadge {
    id: string,
    title: string,
    description: string,
    icon: string
}
export const getEmployeeBadgeInfo = (years: number): EmployeeBadge => {

    if (years < 1) {

        return {
            id: 'badge_newbie',
            title: 'New Joiner',
            description: 'Welcome on board!',
            icon: '🐣',
        };
    }
    
    if (years >= 5) {

        return {
            id: 'badge_5years',
            title: 'The Legend',
            description: 'Five years of excellence!',
            icon: '🏆',
        };

    }
    
    if (years >= 3) {
        return {
            id: 'badge_3years',
            title: 'Team Veteran',
            description: 'Three years strong!',
            icon: '🛡️',
        };
    }
    
    if (years >= 1) {
        return {
            id: 'badge_1year',
            title: 'One-Year Hero',
            description: 'You’ve been with us for a year!',
            icon: '🥇',
        };
    }
    
    return {
        id: 'badge_regular',
        title: 'Employee',
        description: 'Valued team member',
        icon: '👤',
    };

}