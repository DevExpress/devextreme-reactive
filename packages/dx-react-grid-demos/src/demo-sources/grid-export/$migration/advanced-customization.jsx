/* usual imports */
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';

export default () => {
  const onExporting = useCallback(e => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
      customizeCell: ({ gridCell, excelCell }) => {
        if (gridCell.data.OrderDate < new Date(2014, 2, 3)) {
          excelCell.font = { color: { argb: 'AAAAAA' } };
        }
        if (gridCell.data.SaleAmount > 15000) {
          if (gridCell.column.name === 'SaleAmount') {
            excelCell.font = { color: { argb: '000000' } };
            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
          }
        }
        if (gridCell.column.name === 'SaleAmount') {
          excelCell.numFmt = '$0';
        }
        if (!!gridCell.totalSummaryItemName) {
          excelCell.font = { italic: true };
        }
      }
    }).then(() => {
      /* Customize the Header */
      const generalStyles = {
        font: { bold: true },
        fill: {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        },
        alignment: { horizontal: 'left' },
      };
      for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
        worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
        worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
        Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
        Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
      }
      worksheet.getRow(1).height = 20;
      worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
      worksheet.getRow(1).getCell(4).numFmt = 'd mmmm yyyy';
      worksheet.getRow(1).getCell(4).font = { bold: true, size: 16 };
      worksheet.getColumn(1).values = ['Sale Amounts:', 'Company Name:', 'Address:', 'Phone:', 'Website:'];
      worksheet.getColumn(4).values = [new Date(), 'K&S Music', '1000 Nicllet Mall Minneapolis Minnesota', '(612) 304-6073', 'www.nowebsitemusic.com'];
      worksheet.addRow({});
      
      /* Customize the Footer */
      
      const { lastRow } = worksheet;
      let currentRowIndex = lastRow.number + 2;
      for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
        worksheet.mergeCells(currentRowIndex + rowIndex, 1, currentRowIndex + rowIndex, 6);
        Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), { font: { bold: true }, alignment: { horizontal: 'right' } });
      }
      worksheet.getRow(currentRowIndex).getCell(1).value = 'If you have any questions, please contact John Smith.';
      currentRowIndex += 1;
      worksheet.getRow(currentRowIndex).getCell(1).value = 'Phone: +111-111';
      currentRowIndex += 1;
      worksheet.getRow(currentRowIndex).getCell(1).value = 'For demonstration purposes only';
      worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
  
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  }, []);

  return (
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
        dataField="OrderDate"
        caption="Order Date"
        format="shortDate"
      />
      <Column
        dataField="CustomerStoreCity"
        caption="City"
      />
      <Column
        dataField="CustomerStoreState"
        caption="State"
      />
      <Column
        dataField="SaleAmount"
        caption="Sale Amount"
      />
      <Summary>
        <TotalItem
          column="OrderNumber"
          summaryType="count"
        />
        <TotalItem
          column="SalesAmount"
          summaryType="sum"
        />
      </Summary>
      <Export enabled={true} />
    </DataGrid>
  );
};