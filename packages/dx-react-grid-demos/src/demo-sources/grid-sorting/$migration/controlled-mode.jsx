export default () => {
    const [sorting, setSorting] = useState({
        '2': 'asc'
    });

    const onSortOrderChanged = useCallback((columnIndex) => (columnSorting) => {
        setSorting({
        ...sorting,
        [columnIndex]: columnSorting,
        })
    }, [sorting]);

    return (
        <DataGrid
        dataSource={rows}
        >
        {
            columns.map((column, idx) => (
            <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
                allowSorting={true}
                onSortOrderChanged={onSortOrderChanged(idx)}
                sortOrder={sorting[idx]}
            >
            </Column>
            ));  
        }
        </DataGrid>
    );
};