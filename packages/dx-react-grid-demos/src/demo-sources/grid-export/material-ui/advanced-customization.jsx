import React, { useState, useRef, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  GridExporter,
  SelectionState,
  IntegratedSelection,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  TableSummaryRow,
  TableSelection,
  DragDropProvider,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';

import saveAs from 'file-saver';

import { orders } from '../../../demo-data/orders';

const groupColors = {
  Employee: 'BEDFE6',
  CustomerStoreCity: 'C9ECD7',
};

const useGroupStyles = makeStyles({
  groupRow: ({ groupedBy }) => ({
    backgroundColor: `#${groupColors[groupedBy]}`,
  }),
  content: {
    backgroundColor: 'inherit !important',
  },
});

const GroupRow = (props) => {
  const { row } = props;
  const classes = useGroupStyles(row);
  return <TableGroupRow.Row {...props} className={classes.groupRow} />;
};

const GroupCell = (props) => {
  const classes = useGroupStyles();
  return (
    <TableGroupRow.Cell {...props} className={classes.groupCell} />
  );
};

const GroupIndentCell = (props) => {
  const classes = useGroupStyles();
  return (
    <TableGroupRow.IndentCell {...props} className={classes.content} />
  );
};

const GroupCellContainer = (props) => {
  const classes = useGroupStyles();
  return (
    <TableGroupRow.Container {...props} className={classes.content} />
  );
};

const getCellStyle = ({ OrderDate, SaleAmount }, column) => {
  const style = {};
  if (OrderDate < new Date(2014, 2, 3)) {
    style.color = '#AAAAAA !important';
  }
  if (SaleAmount > 15000) {
    if (column.name === 'OrderNumber') {
      style.fontWeight = 'bold';
    }
    if (column.name === 'SaleAmount') {
      style.backgroundColor = '#FFBB00';
      style.color = '#000000';
    }
  }
  return style;
};

const useCellStyles = makeStyles({
  cell: ({ row, column }) => getCellStyle(row, column),
});

const Cell = (props) => {
  const classes = useCellStyles(props);
  return (
    <Table.Cell {...props} className={classes.cell} />
  );
};

const DateFormatter = ({ value }) => (
  <span>
    {value.toLocaleDateString()}
  </span>
);

const DateTypeProvider = props => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

// worksheet customization
/* eslint-disable no-param-reassign */
const customizeCell = (cell, row, column) => {
  if (row.groupedBy) {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: groupColors[row.groupedBy] } };
    cell.font = { color: { argb: '000000' } };
  }
  if (row.OrderDate < new Date(2014, 2, 3)) {
    cell.font = { color: { argb: 'AAAAAA' } };
  }
  if (row.SaleAmount > 15000) {
    if (column.name === 'SaleAmount') {
      cell.font = { color: { argb: '000000' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
    }
  }
  if (column.name === 'SaleAmount') {
    cell.numFmt = '$0';
  }
};

const customizeSummaryCell = (cell /* col, summary */) => {
  cell.font = { italic: true };
};

const customizeHeader = (worksheet) => {
  const generalStyles = {
    font: { bold: true },
    fill: {
      type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
    },
    alignment: { horizontal: 'left' },
  };
  for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
    worksheet.mergeCells(rowIndex, 1, rowIndex, 2);
    worksheet.mergeCells(rowIndex, 3, rowIndex, 4);
    Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
    Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
  }
  worksheet.getRow(1).height = 20;
  worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
  worksheet.getRow(1).getCell(3).numFmt = 'd mmmm yyyy';
  worksheet.getRow(1).getCell(3).font = { bold: true, size: 16 };
  worksheet.getColumn(1).values = ['Sale Amounts:', 'Company Name:', 'Address:', 'Phone:', 'Website:'];
  worksheet.getColumn(3).values = [new Date(), 'K&S Music', '1000 Nicllet Mall Minneapolis Minnesota', '(612) 304-6073', 'www.nowebsitemusic.com'];
};

const customizeFooter = (worksheet) => {
  const { lastRow } = worksheet;
  let currentRowIndex = lastRow.number + 2;
  for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
    worksheet.mergeCells(currentRowIndex + rowIndex, 1, currentRowIndex + rowIndex, 4);
    Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), { font: { bold: true }, alignment: { horizontal: 'right' } });
  }
  worksheet.getRow(currentRowIndex).getCell(1).value = 'If you have any questions, please contact John Smith.';
  currentRowIndex += 1;
  worksheet.getRow(currentRowIndex).getCell(1).value = 'Phone: +111-111';
  currentRowIndex += 1;
  worksheet.getRow(currentRowIndex).getCell(1).value = 'For demonstration purposes only';
  worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
};
/* eslint-enable no-param-reassign */

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};

export default () => {
  const [columns] = useState([
    { name: 'Employee', title: 'Employee' },
    { name: 'OrderNumber', title: 'Invoice Number' },
    { name: 'OrderDate', title: 'Order Date' },
    { name: 'CustomerStoreCity', title: 'City' },
    { name: 'CustomerStoreState', title: 'State' },
    { name: 'SaleAmount', title: 'Sale Amount' },
  ]);
  const [rows] = useState(orders);
  const [dateColumns] = useState(['OrderDate']);
  const [groupSummaryItems] = useState([
    { columnName: 'OrderNumber', type: 'count' },
    { columnName: 'SaleAmount', type: 'max' },
  ]);
  const [totalSummaryItems] = useState([
    { columnName: 'OrderNumber', type: 'count' },
    { columnName: 'SaleAmount', type: 'sum' },
  ]);
  const [grouping, setGrouping] = useState([
    { columnName: 'Employee' }, { columnName: 'CustomerStoreCity' },
  ]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <DragDropProvider />
        <DateTypeProvider for={dateColumns} />
        <GroupingState
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
        <SummaryState
          totalItems={totalSummaryItems}
          groupItems={groupSummaryItems}
        />
        <SelectionState selection={selection} onSelectionChange={setSelection} />
        <IntegratedGrouping />
        <IntegratedSummary />
        <IntegratedSelection />
        <Table cellComponent={Cell} />
        <TableHeaderRow />
        <TableSelection />
        <TableGroupRow
          cellComponent={GroupCell}
          containerComponent={GroupCellContainer}
          indentCellComponent={GroupIndentCell}
          rowComponent={GroupRow}
        />
        <TableSummaryRow />
        <Toolbar />
        <GroupingPanel />
        <ExportPanel startExport={startExport} />
      </Grid>

      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        grouping={grouping}
        totalSummaryItems={totalSummaryItems}
        groupSummaryItems={groupSummaryItems}
        // selection={selection}

        onSave={onSave}
        customizeCell={customizeCell}
        customizeSummaryCell={customizeSummaryCell}
        customizeHeader={customizeHeader}
        customizeFooter={customizeFooter}
      />
    </Paper>
  );
};