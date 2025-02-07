const HighlightedCell = (cellData) => (
    <div
      style={{
        padding: "14px",
        backgroundColor: cellData.value < 5000 ? "red" : undefined,
      }}
    >
      <span
        style={{
          color: cellData.value < 5000 ? "white" : undefined,
        }}
      >
        {cellData.value}
      </span>
    </div>
  );
  
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
              cssClass={column.dataField === "amount" ? "highlightedCell" : ""}
              cellRender={column.name === 'amount' ? HighlightedCell : undefined}
            >
            </Column>
          ));  
        }
      </DataGrid>
    );
  };