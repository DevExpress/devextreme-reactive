export default () => {
    const [selectedRows, setSelectedRows] = useState([1]);
    const onSelectionChanged = useCallback((e) => {
      setSelectedRows(e.selectedRowKeys);
    }, []);
  
    return (
      <div>
        <div>
          Total rows selected:
          {' '}
          {selectedRows.length}
        </div>
        <DataGrid
          dataSource={rows}
          selectedRowKeys={selectedRows}
          onSelectionChanged={onSelectionChanged}
        >
          <Selection
            mode={'multiple'}
            selectAllMode={'page'}
          />
          <Paging
            defaultPageIndex={0}
            pageSize={6}
          />
          <Pager visible={true} />
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