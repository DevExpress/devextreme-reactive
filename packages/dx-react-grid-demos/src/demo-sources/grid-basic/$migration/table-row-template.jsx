const styles = {
    banking: {
      backgroundColor: '#f5f5f5',
    },
    health: {
      backgroundColor: '#a2e2a4',
    },
    telecom: {
      backgroundColor: '#b3e5fc',
    },
    energy: {
      backgroundColor: '#ffcdd2',
    },
    insurance: {
      backgroundColor: '#f0f4c3',
    },
  };
  
  const getSectorData = (gridData: DataGridTypes.ColumnCellTemplateData) => gridData.data['sector'];
  
  
  const TableRow = (rowData: DataGridTypes.RowTemplateData) => (
    <tr
      role="row"
      className="dx-row dx-data-row dx-row-lines"
      onClick={() => alert(JSON.stringify(rowData.data))}
      style={{
        cursor: "pointer",
        ...styles[getSectorData(rowData)],
      }}
    >
      <td role="gridcell">{rowData.data.region}</td>
      <td role="gridcell">{rowData.data.sector}</td>
      <td role="gridcell">{rowData.data.customer}</td>
      <td role="gridcell">{rowData.data.product}</td>
      <td role="gridcell">{rowData.data.amount}</td>
    </tr>
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
              dataRowRender={TableRow}
            >
            </Column>
          ));  
        }
      </DataGrid>
    );
  };