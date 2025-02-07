export default () => {
    const [filterValue, setFilterValue] = useState({
      ['car', '=', 'cruze']
    });
  
    return (
      <div>
        <DataGrid
          dataSource={rows}
          filterValue={filterValue}
          onFilterValueChanged={setFilterValue}
        >
          <FilterRow
            visible={true}
            showOperationChooser={false}
          />
          {
            columns.map((column, idx) => (
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