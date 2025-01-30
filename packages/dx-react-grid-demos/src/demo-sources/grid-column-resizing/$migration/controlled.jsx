export default () => {
    const [columns] = useState([
      { name: 'name', title: 'Name' },
      { name: 'gender', title: 'Gender' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ]);
  
    const [columnWidths, setColumnWidths] = useState({
      '0': 180,
      '1': 180,
      '2': 180,
      '3': 240
    });
  
    const onWidthChanged = useCallback((columnIndex) => (width) => {
      setColumnWidths({
        ...columnWidths,
        [columnIndex]: width
      })
    }, [columnWidths]);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
          allowColumnResizing={true}
        >
          {
            columns.map((column, idx) => (
              <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
                onWidthChanged={onWidthChanged(idx)}
                width={columnWidths[idx]}
              >
              </Column>
            ));  
          }
        </DataGrid>
      </div>
    );
};