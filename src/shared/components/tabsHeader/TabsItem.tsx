

interface TabsItemProps {
    tabId: string,
    tabName: string,
    isActive: boolean,
    onSelect: (tabId: string) => void,
}

const TabsItem = ({ tabId, tabName, isActive, onSelect}: TabsItemProps) => {

    const baseStyles = 'bg-gray-100 text-xs p-1 rounded-xl cursor-pointer';
    const activeStyles = isActive ? 'font-bold' : '';


    return (
        <div 
            title={tabName}
            onClick={() => onSelect(tabId)} 
            className={`${activeStyles} ${baseStyles}`}
            role='tab'
            aria-selected={isActive} 
            aria-label={`Tab: ${tabName}`}
        >
            {tabName}
        </div>
    )

}

export default TabsItem;