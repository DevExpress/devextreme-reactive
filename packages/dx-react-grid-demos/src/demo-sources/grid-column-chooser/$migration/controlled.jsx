export default () => {
    const [columns] = useState([
      { name: 'name', title: 'Name' },
      { name: 'gender', title: 'Gender' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ]);
  
    const [columnVisibility, setColumnVisibility] = useState({
      '0': true,
      '1': false,
      '2': true,
      '3': false
    });
  
    const onVisibleChanged = useCallback((columnIndex) => (visibility) => {
      setColumnVisibility({
        ...columnVisibility,
        [columnIndex]: visibility
      });
    }, [columnVisibility]);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          {
            columns.map((column, idx) => (
              <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
                onVisibleChanged={onVisibleChanged(idx)}
                visible={columnVisibility[idx]}
              >
              </Column>
            ));  
          }
        </DataGrid>
      </div>
    );
};