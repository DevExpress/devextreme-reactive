export default () => {
    const [selectedRows, setSelectedRows] = useState([1]);
    const onSelectionChanged = useCallback((e) => {
      setSelectedRows(e.selectedRowKeys);
    }, []);
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
          selectedRowKeys={selectedRows}
          onSelectionChanged={onSelectionChanged}
        >
          <Selection
            mode={'multiple'}
            allowSelectAll={false}
          />
          <Column
            dataField={'name'}
            caption={'Name'}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
          />
          <Column
            dataField={'city'}
            caption={'City'}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
          />
        </DataGrid>
      </div>
    );
};