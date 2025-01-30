export default () => {
    const [columns] = useState([
      { dataField: 'name', caption: 'Name', defaultSortOrder: 'asc' },
      { dataField: 'gender', caption: 'Gender', allowSorting: false },
      { dataField: 'city', caption: 'City', allowSorting: false },
      { dataField: 'car', caption: 'Car', allowSorting: false }
    ]);
  
    const onRowInserted = useCallback((e) => {
      e.component.navigateToRow(e.key);
    }, []);
    
    return (
      <div>
        <DataGrid
          dataSource={rows}
          columns={columns}
          onRowInserted={onRowInserted}
          height={440}
        >
          <Editing
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            mode="row"
          />
          <Scrolling rowRenderingMode={'virtual'} />
        </DataGrid>
      </div>
    );
};