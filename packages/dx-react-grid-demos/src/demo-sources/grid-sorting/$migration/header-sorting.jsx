export default () => {
    return (
      <DataGrid
        dataSource={rows}
      >
        {
          columns.map(column => (
            <Column
              key={column.name}
              dataField={column.name}
              caption={column.title}
              allowSorting={true}
              defaultSortOrder={column.name === 'city' ? 'asc' : undefined}
            >
            </Column>
          ));  
        }
      </DataGrid>
    );
};
  