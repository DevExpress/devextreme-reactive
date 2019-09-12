import * as React from 'react';
import {
  Plugin, Getter, Action, Getters, Actions,
} from '@devexpress/dx-react-core';
import { Workbook } from 'exceljs';
import { Table } from '@devexpress/dx-react-grid';
import { ExporterProps } from '../types';


const exportHeader = (worksheet, columns) => {
  const cols = columns
    .map(({ column, width }) => ({ ...column, width: (width || 150) / 8 }))
    .map(({ name, title, width }) => ({
      key: name, header: title, width,
    }));
  worksheet.columns = cols;
  worksheet.views.push({ state: 'frozen', ySplit: 1, topLeftCell: 'A1' })
};



class ExportBase extends React.PureComponent<ExporterProps> {
  constructor(props) {
    super(props);
  }

  exportGrid = (_: any, {
    tableColumns, columns: dataColumns,
    getCellValue, grouping, rows, getCollapsedRows,
    groupSummaryItems, groupSummaryValues, totalSummaryItems, totalSummaryValues,
  }: Getters, {
    finishExport,
  }: Actions) => {
    const columns = tableColumns.filter(c => c.type === Table.COLUMN_TYPE)

    const { onSave, customizeCell } = this.props;
    const workbook: Workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main');

    exportHeader(worksheet, columns);

    const outlineLevels = grouping.reduce((acc, { columnName }, index) => ({ ...acc, [columnName]: index }), {});

    // console.log(worksheet.columns, outlineLevels)

    const expandRows = rows =>
      rows.reduce((acc, row) => (
        [...acc, row, ...(expandRows(getCollapsedRows(row) || []))]
      ), []
    );
    const allRows = expandRows(rows);
    // console.log(rows);
    // console.log(allRows)

    const operations = {
      count: 'COUNTA',
    };

    const exportSummary = ({ columnName, type }, start, end) => {
      const row = worksheet.lastRow!;
      const letter = worksheet.getColumn(columnName).letter;
      const operation = operations[type] || type.toUpperCase();
      row.getCell(columnName).value = { formula: `${operation}(${letter}${start}:${letter}${end})`, date1904: false }
    };

    const closeGroup = ({ start, end, level }) => {
      if (!groupSummaryItems) return;

      worksheet.addRow({});
      worksheet.lastRow!.outlineLevel = level;

      groupSummaryItems.forEach((s) => {
        exportSummary(s, start, end)
      })
    };

    const closeSheet = () => {
      worksheet.addRow({});

      totalSummaryItems.forEach((s) => {
        exportSummary(s, 2, worksheet.rowCount - 1)
      })
    }

    const groupRanges = {};

    let currentLevel = 0;
    let currentGroup: any | null = null;
    allRows.forEach((row) => {
      let r;

      if (row.groupedBy) {
        console.log(row)
        if (currentGroup !== null) {
          currentGroup.end = worksheet.lastRow!.number;
          // groupRanges[row.]
          closeGroup(currentGroup);
        }

        const lastIndex = worksheet.lastRow!.number;
        currentGroup = { start: lastIndex, groupedBy: row.groupedBy, level: outlineLevels[row.groupedBy] + 1 }

        const title = dataColumns.find(({ name }) => name === row.groupedBy).title;
        r = { [columns[0].name]: `${title}: ${row.value}` };
        worksheet.addRow(r);

        worksheet.mergeCells(lastIndex + 1, 1, lastIndex + 1, columns.length);
        worksheet.lastRow!.getCell(1).font = { bold: true };
        currentLevel = outlineLevels[row.groupedBy];
        if (currentLevel > 0) {
          worksheet.lastRow!.outlineLevel = currentLevel;
        }
        currentLevel += 1;
        // console.log(worksheet.lastRow.actualCellCount)
      } else {
        r = columns.reduce((acc, { name }) => ({ ...acc, [name]: getCellValue(row, name) }), {});
        worksheet.addRow(r);
        worksheet.lastRow!.outlineLevel = currentLevel;
      }

      worksheet.lastRow!.eachCell((cell, colNumber) => {
        customizeCell(cell, row, columns[colNumber - 1]);
      })
      // customizeRow(worksheet.lastRow, row);
    });

    closeSheet();

    onSave(workbook);

    finishExport();
  }

  render() {
    // const exportGridAction = this.exportGrid;

    return (
      <Plugin name="Export">
        <Action name="startExport" action={this.exportGrid} />
      </Plugin>
    )
  }
}

export const Exporter: React.ComponentType<ExporterProps> = ExportBase;
