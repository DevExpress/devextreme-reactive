export default () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleSelectionChange = useCallback(e => {
      setSelectedRowKeys(e.selectedRowKeys);
    }, []);
  
    return (
      <div>
        <span>
          Total rows selected:
          {' '}
          {selectedRowKeys.length}
        </span>
        <DataGrid
          dataSource={rows}
          selectedRowKeys={selectedRowKeys}
          onSelectionChanged={handleSelectionChange}
        >
          <Selection allowSelectAll={true} />
          <Paging
            defaultPageIndex={0}
            pageSize={6}
          />
          {
            columns.map(column => (
              <Column
                key={column.name}
                dataField={column.name}
                caption={column.title}
              >
              </Column>
            ));  
          }
        </DataGrid>
      </div>
    );
};