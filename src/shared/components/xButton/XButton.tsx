import { ReactNode, MouseEvent  } from 'react';
import { MdClose } from 'react-icons/md';



interface XButtonProps {
    ariaLabel: string,
    title: string,
    size?: number,
    className?: string,
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode,
}
const XButton = ({ariaLabel='close', title, size=14, className='', onClick, children}: XButtonProps) => {

    return (
        <button 
            type='button'
            onClick={onClick}
            className={` hover:text-red-800 transition cursor-pointer ${className}`}
            aria-label={ariaLabel}
            title={title} 
        >
            {children || <MdClose size={size}/> }
        </button>
    )
}

export default XButton;