export default () => {
    const [columns] = useState([
      { name: 'name', title: 'Name' },
      { name: 'gender', title: 'Gender' },
      { name: 'city', title: 'City' },
      { name: 'car', title: 'Car' },
    ]);
  
    const [visibleIndexes, setVisibleIndexes] = useState({
      '2': 0,
      '1': 1,
      '3': 2,
      '0': 3,
    });
  
    const onVisibleIndexChanged = useCallback((columnIndex) => (columnVisibleIndex) => {
      setVisibleIndexes({
        ...visibleIndexes,
        [columnIndex]: columnVisibleIndex
      })
    }, [visibleIndexes]);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
          allowColumnReordering={true}
        >
          {
            columns.map((column, idx) => (
              <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
                visibleIndex={visibleIndexes[idx]}
                onVisibleIndexChanged={onVisibleIndexChanged(idx)}
              >
              </Column>
            ));  
          }
        </DataGrid>
      </div>
    );
};