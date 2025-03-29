import { MdClose } from 'react-icons/md';

import { OUTLET_TAB } from '../../constants/outletTab';


interface TabsItemProps {
    tabId: string,
    tabName: string,
    isActive: boolean,
    onSelect: (tabId: string) => void,
    onClose?: () => void,
}

const TabsItem = ({ tabId, tabName, isActive, onSelect, onClose}: TabsItemProps) => {

    const isOutletTab = tabId === OUTLET_TAB; 

    const baseStyles = 'text-xs text-gray-600 py-1 px-2 rounded-xl cursor-pointer flex items-center gap-3 transition';
    const activeStyles = isActive ? 'font-bold bg-transparent shadow border' : 'bg-gray-100';

    const outletStyles = isOutletTab ? 'bg-transparent text-xl' : '';

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose?.();
    };

    return (

        <div 
            title={`${tabName} page`}
            onClick={() => onSelect(tabId)} 
            className={`${activeStyles} ${baseStyles} ${outletStyles}`}
            role='tab'
            aria-selected={isActive} 
            aria-label={`Tab: ${tabName}`}
        >
            <span className='max-w-[120px]'>
                {tabName}
            </span>

            {!isOutletTab && onClose &&
                <button 
                    type='button'
                    onClick={handleClose}
                    className='hover:text-red-800 transition cursor-pointer'
                    aria-label="Close tab" 
                >
                    <MdClose size={14}/>
                </button>

            }
        </div>
    )

}

export default TabsItem;