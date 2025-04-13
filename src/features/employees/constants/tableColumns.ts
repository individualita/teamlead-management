type AlignOptions = 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;

interface TableColumn {
    key: string,
    label: string,
    align: AlignOptions
}


export const TABLE_COLUMNS: TableColumn[] = [
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'position', label: 'Position', align: 'left' },
    { key: 'startDate', label: 'Start Date', align: 'left' },
    { key: 'status', label: 'Status', align: 'center' },
    { key: 'actions', label: 'Actions', align: 'center' }, 
];


export const COLLAPSIBLE_ROW_COLUMNS = ['Email', 'Phone'] as const;