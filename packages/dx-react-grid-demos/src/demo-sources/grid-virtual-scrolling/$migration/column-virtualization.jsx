export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
          columnAutoWidth={true}
          height={440}
        >    
          <Scrolling
            rowRenderingMode="virtual"
            columnRenderingMode="virtual"
          />
          {
            columns.map((column) => (
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