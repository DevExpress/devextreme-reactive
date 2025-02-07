const SortingIcon = ({ sortOrder }) => (
    <span
      className={`oi oi-arrow-thick-${sortOrder === 'asc' ? 'top' : 'bottom'}`}
      style={{ fontSize: '12px', paddingLeft: '5px' }}
    />
  );
  
  const SortLabel = ({ toggleSort, text, sortOrder }) => (
    <button
      type="button"
      className="btn btn-light btn-sm"
      onClick={toggleSort}
    >
      {text}
      {(sortOrder && <SortingIcon sortOrder={sortOrder} />)}
    </button>
  );
  
  export default () => {
    const renderHeaderCell = useCallback(({ column, columnIndex, component }) => {
      const sortOrder = component.columnOption(column.name, "sortOrder");
      
      const toggleSort = useCallback(() => {
        component.columnOption(column.name, "sortOrder", sortOrder === 'asc' ? 'desc' : 'asc');
      }, [sortOrder, component, column]);
  
      return (
        <SortLabel
          toggleSort={toggleSort}
          text={column.caption}
          sortOrder={sortOrder}
        />;
      ), [])
    };
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Column
            dataField={'name'}
            caption={'Name'}
            headerCellRender={renderHeaderCell}
          />
          <Column
            dataField={'gender'}
            caption={'Gender'}
            headerCellRender={renderHeaderCell}
          />
          <Column
            dataField={'city'}
            caption={'City'}
            defaultSortOrder={'asc'}
            headerCellRender={renderHeaderCell}
          />
          <Column
            dataField={'car'}
            caption={'Car'}
            headerCellRender={renderHeaderCell}
          />
        </DataGrid>
      </div>
    );
};