/* usual imports */
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';


const onExporting = e => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Main sheet');

  exportDataGrid({
    component: e.component,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  });
};

export default () => (
  <DataGrid
    dataSource={orders}
    keyExpr="ID"
    width="100%"
    showBorders={true}
    onExporting={onExporting}
  >
    <Column
      dataField="Employee"
      caption="Employee"
    />
    <Column
      dataField="OrderNumber"
      caption="Invoice Number"
    />
    <Column
      dataField="CustomerStoreCity"
      caption="City"
    />
    <Column
      dataField="SaleAmount"
      caption="Sale Amount"
    />
    <Export enabled={true} />
  </DataGrid>
);