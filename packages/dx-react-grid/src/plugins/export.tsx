import * as React from 'react';
import {
  Plugin, Action, Getters, Actions,
} from '@devexpress/dx-react-core';
import { Workbook, Worksheet } from 'exceljs';
import { Table } from '@devexpress/dx-react-grid';
import { ExporterProps } from '../types';
import { defaultSummaryMessages } from '../components/summary/table-summary-content';


const exportHeader = (worksheet: Worksheet, columns) => {
  const cols = columns
    .map(({ column, width }) => ({ ...column, width: (width || 150) / 8 }))
    .map(({ name, title, width }) => ({
      key: name, header: title, width,
    }));
  worksheet.columns = cols;

  let { lastRow } = worksheet;
  if (lastRow) {
    worksheet.addRow({});
  }
  
  const r = columns.reduce((acc, { column: { name, title }}) => ({
    ...acc,
    [name]: title,
  }), {});
  worksheet.addRow(r);
  
  worksheet.views.push({
    state: 'frozen', ySplit: worksheet.lastRow!.number,
  });
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

    const { onSave, customizeCell, customizeHeader, customizeFooter } = this.props;
    const workbook: Workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main');

    customizeHeader(worksheet);

    exportHeader(worksheet, columns);

    const outlineLevels = grouping?.reduce((acc, { columnName }, index) => ({ ...acc, [columnName]: index }), {});
    const maxLevel = grouping?.length - 1;

    const expandRows = rows =>
      rows.reduce((acc, row) => (
        [...acc, row, ...(expandRows(getCollapsedRows(row) || []))]
      ), []
    );
    const allRows = expandRows(rows);

    const operations = {
      count: 'COUNTA',
    };

    const exportSummary = ({ columnName, type }, ranges) => {
      const row = worksheet.lastRow!;
      const letter = worksheet.getColumn(columnName).letter;
      const operation = operations[type] || type.toUpperCase();
      const rangesStr = ranges.map(range => (
        range
          .map(r => `${letter}${r}`)
          .filter((val, index, arr) => arr.indexOf(val) === index)
          .join(':')
      )).join(',');

      const cell = row.getCell(columnName);
      cell.value = {
        formula: `${operation}(${rangesStr})`,
        date1904: false,
      };
      cell.numFmt = `"${defaultSummaryMessages[type]}:" 0`;
    };

    const findRanges = (compoundKey, level, result) => {
      if (level !== maxLevel) {
        let ranges: any[] = [];
        for (let i = 0; i < groupTree[compoundKey].length; i++) {
          ranges = [...ranges, ...findRanges(groupTree[compoundKey][i], level + 1, result)];
        }
        return [...result, ...ranges];
      } else {
        return [...result, groupTree[compoundKey]];
      }
    };

    const closeGroup = (group) => {
      const { groupedBy, compoundKey } = group;
      if (!groupSummaryItems) return;

      worksheet.addRow({});
      worksheet.lastRow!.outlineLevel = outlineLevels[groupedBy] + 1;

      const ranges = findRanges(compoundKey, outlineLevels[groupedBy], []);

      groupSummaryItems.forEach((s) => {
        exportSummary(s, ranges)
      });
    };

    const closeSheet = () => {
      worksheet.addRow({});

      totalSummaryItems.forEach((s) => {
        exportSummary(s, findRanges('__root', -1, []));
      });
    }


    let currentLevel = 0;
    let openGroups: any[] = [];
    
    const groupTree = { '__root': [] as any[] };

    let parentChain = {};
    let lastDataIndex = 0;
    let openGroup = '';
    let index = worksheet.lastRow!.number + 1;
    let level = 0;
    let prevLevel = 0;
    allRows.forEach((row) => {
      const { groupedBy, compoundKey } = row;
      debugger;
      if (groupedBy) {
        level = outlineLevels[groupedBy];
        if (level === 0) {
          groupTree['__root'].push(compoundKey);
        }
        groupTree[compoundKey] = [];
        parentChain[level] = compoundKey;
        if (0 < level && level <= maxLevel) {
          groupTree[parentChain[level - 1]].push(compoundKey);
        }
        if (level === maxLevel) {
          if (openGroup) {
            // close prev group
            groupTree[openGroup].push(lastDataIndex);
          }
          openGroup = compoundKey;
          let start = index + 1;
          if (lastDataIndex > 0) {
            start += 1;
            index += 1;
          }
          groupTree[compoundKey].push(start);
        } else if (level < prevLevel) {
          index += maxLevel - level;
        }
        prevLevel = level;
      } else {
        lastDataIndex = index;
      }
      index += 1;
    });

    console.log('v2', groupTree);

    allRows.forEach((row) => {
      let r;

      if (row.groupedBy) {
        currentLevel = outlineLevels[row.groupedBy];

        const groupsToClose = openGroups.slice(currentLevel);
        groupsToClose.reverse().forEach(closeGroup); // close nested groups first

        openGroups = openGroups.slice(0, currentLevel);
        openGroups[currentLevel] = { groupedBy: row.groupedBy, compoundKey: row.compoundKey };

        const lastIndex = worksheet.lastRow!.number;

        // add group row 
        const title = dataColumns.find(({ name }) => name === row.groupedBy).title;
        r = { [columns[0].column.name]: `${title}: ${row.value}` };

        worksheet.addRow(r);

        // merge into single cell
        worksheet.mergeCells(lastIndex + 1, 1, lastIndex + 1, columns.length);
        worksheet.lastRow!.getCell(1).font = { bold: true };

        if (currentLevel > 0) {
          worksheet.lastRow!.outlineLevel = currentLevel;
        }
        currentLevel += 1;
      } else {
        r = columns.reduce((acc, { column: { name }}) => ({
          ...acc,
          [name]: getCellValue(row, name),
        }), {});
        worksheet.addRow(r);
        worksheet.lastRow!.outlineLevel = currentLevel;
      }

      worksheet.lastRow!.eachCell((cell, colNumber) => {
        customizeCell(cell, row, columns[colNumber - 1]);
      });
    });

    closeSheet();

    customizeFooter(worksheet);

    onSave(workbook);

    finishExport();
  }

  render() {
    // const exportGridAction = this.exportGrid;

    return (
      <Plugin name="Exporter">
        <Action name="performExport" action={this.exportGrid} />
      </Plugin>
    )
  }
}

export const Exporter: React.ComponentType<ExporterProps> = ExportBase;
