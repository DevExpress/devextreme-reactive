const RowDetail = ({ data }) => (
    <div>
      Details for
      {' '}
      {data.name}
      {' '}
      from
      {' '}
      {data.city}
    </div>
  );
  
  export default () => {
    const [defaultExpandedRows, setDefaultExpandedRows] = useState([2, 5]);
    
    const onContentReady = useCallback(e => {
      if (defaultExpandedRows.length) {
        defaultExpandedRows.forEach(key => e.component.expandRow(key));
        setDefaultExpandedRows([]);
      }
    }, [defaultExpandedRows]);
    
    return (
      <div>
        <DataGrid
          dataSource={rows}
          onContentReady={onContentReady}
        >
          <MasterDetail
            enabled={true}
            render={RowDetail}
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