import { ReactNode } from 'react';

import '../styles/employees.css';

interface ActionButton {
    onClick: () => void;
    ariaLabel: string;
    text: string;
    icon: ReactNode;
}
const ActionButton = ({ onClick, ariaLabel, text, icon }: ActionButton) => {
    return (
        <button
            onClick={onClick}
            className='employees-action-button'
            role='menuitem'
            aria-label={ariaLabel}
        >
            {icon}
            <span className='text-sm md:text-base'>{text}</span>
        </button>
    );
};

export default ActionButton;
