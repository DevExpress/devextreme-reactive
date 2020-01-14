import * as Excel from 'exceljs';
import { PureComputed } from '@devexpress/dx-core/src';
import {
  TableColumn, FilterSelectedRowsFn, BuildGroupTreeFn, FindRangesFn, ExportRowsFn,
  GetExportSummaryFn, GetCloseGroupFn, GetOutlineLevelsFn, GetRowsToExportFn, Row, CloseSheetFn,
} from "../../types";
import { ROOT_GROUP } from './constants';

export const filterSelectedRows: FilterSelectedRowsFn = (rows, getRowId, selection) => {
  const selectionSet = new Set<any>(selection);
  return rows.filter(row => selectionSet.has(getRowId(row)));
};

export const getOutlineLevels: GetOutlineLevelsFn = (grouping) => (
  grouping?.reduce((acc, { columnName }, index) => ({
    ...acc,
    [columnName]: index,
  }), {}) || {}
);

export const getRowsToExport: GetRowsToExportFn = (
  rows, selection, getCollapsedRows, getRowId,
) => {
  const expandRows: PureComputed<[Row[]]> = (rows) => (
    rows.reduce((acc, row) => (
      [...acc, row, ...(expandRows(getCollapsedRows(row) || []))]
    ), [])
  );

  const expandedRows = expandRows(rows);

  if (!!selection) {
    return filterSelectedRows(expandedRows, getRowId, selection);
  }
  return expandedRows;
}

export const exportHeader = (worksheet: Excel.Worksheet, columns: TableColumn[]) => {
  const cols = columns
    .map(({ column, width }) => ({ ...column!, width: (width as number || 150) / 8 }))
    .map(({ name, width }) => ({
      key: name, width,
    }));
  worksheet.columns = cols;

  let { lastRow } = worksheet;
  if (lastRow) {
    worksheet.addRow({});
  }
  
  const headerRow = columns.reduce((acc, { column: { name, title } = {}}) => ({
    ...acc,
    [name!]: title,
  }), {});
  worksheet.addRow(headerRow);
  
  worksheet.views.push({
    state: 'frozen', ySplit: worksheet.lastRow!.number,
  });
};

export const buildGroupTree: BuildGroupTreeFn = (
  allRows, outlineLevels, grouping, isGroupRow, groupSummaryItems, startIndex,
) => {
  const groupTree = { [ROOT_GROUP]: [] as any[] };
  const maxLevel = Object.keys(outlineLevels).length - 1;
  const groupSummaryExists = !!groupSummaryItems;

  if (!(grouping && grouping.length)) {
    groupTree[ROOT_GROUP] = [startIndex, startIndex + allRows.length - 1];
    return groupTree;
  }

  let parentChain = { '-1': ROOT_GROUP };
  let lastDataIndex = 0;
  let openGroup = '';
  let index = startIndex;
  let level = 0;
  let prevLevel = 0;

  allRows.forEach((row) => {
    const { groupedBy, compoundKey } = row;
    if (isGroupRow(row)) {
      level = outlineLevels[groupedBy];
      groupTree[compoundKey] = [];
      parentChain[level] = compoundKey;
      if (level <= maxLevel) {
        groupTree[parentChain[level - 1]].push(compoundKey);
      }
      if (level === maxLevel) {
        if (openGroup) {
          // close previous group
          groupTree[openGroup].push(lastDataIndex);
        }
        openGroup = compoundKey;
        if (groupSummaryExists && lastDataIndex > 0) {
          index += 1;
        }
        groupTree[compoundKey].push(index + 1); // first row index
      } else if (groupSummaryExists && level < prevLevel) {
        // jump over summary rows
        index += maxLevel - level;
      }
      prevLevel = level;
    } else {
      lastDataIndex = index;
    }
    index += 1;
  });

  if (openGroup) {
    groupTree[openGroup].push(lastDataIndex);
  }

  return groupTree;
};

export const findRanges: FindRangesFn = (groupTree, compoundKey, level, maxLevel, result = []) => {
  if (level !== maxLevel) {
    const ranges = (groupTree[compoundKey] as string[]).reduce((acc, groupKey) => (
      [...acc, ...findRanges(groupTree, groupKey, level + 1, maxLevel, result)]
    ), [] as Array<number[]>);
    return [...result, ...ranges];
  } else {
    return [...result, groupTree[compoundKey] as number[]];
  }
};

export const exportRows: ExportRowsFn = (
  worksheet, allRows, dataColumns, columns, outlineLevels,
  getCellValue, closeGroup, customizeCell,
) => {
  let currentLevel = 0;
  let openGroups: any[] = [];

  allRows.forEach((row) => {
    let r;

    if (row.groupedBy) {
      currentLevel = outlineLevels[row.groupedBy];

      // close nested groups first
      openGroups.slice(currentLevel).reverse().forEach(closeGroup);

      openGroups = openGroups.slice(0, currentLevel);
      openGroups[currentLevel] = { groupedBy: row.groupedBy, compoundKey: row.compoundKey };

      // add group row 
      const title = dataColumns.find(({ name }) => name === row.groupedBy)?.title;
      r = { [columns[0].column!.name]: `${title}: ${row.value}` };
      
      worksheet.addRow(r);
      const lastIndex = worksheet.lastRow!.number;

      // merge into single cell
      worksheet.mergeCells(lastIndex, 1, lastIndex, columns.length);
      worksheet.lastRow!.getCell(1).font = { bold: true };

      if (currentLevel > 0) {
        worksheet.lastRow!.outlineLevel = currentLevel;
      }
      currentLevel += 1;
    } else {
      r = columns.reduce((acc, { column }) => ({
        ...acc,
        ...(column ? { [column.name]: getCellValue(row, column.name) } : null),
      }), {});
      worksheet.addRow(r);
      worksheet.lastRow!.outlineLevel = currentLevel; 
    }

    worksheet.lastRow!.eachCell((cell, colNumber) => {
      customizeCell(cell, row, columns[colNumber - 1].column!);
    });
  });

  openGroups.reverse().forEach(closeGroup)
};

const operations = {
  count: 'COUNTA',
};
export const getExportSummary: GetExportSummaryFn = (
  worksheet, dataColumns, customizeSummaryCell, defaultSummaryMessages
) => (
  { columnName, type }, ranges,
) => {
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

  const column = dataColumns.find(({ name }) => name === columnName);
  const summary = {
    type,
    ranges,
  };
  customizeSummaryCell(cell, column!, summary);
};

export const getCloseGroup: GetCloseGroupFn = (
  worksheet, groupTree, outlineLevels, maxLevel, groupSummaryItems, exportSummary,
) => (group) => {
  const { groupedBy, compoundKey } = group;
  if (!groupSummaryItems) return;

  worksheet.addRow({});
  worksheet.lastRow!.outlineLevel = outlineLevels[groupedBy] + 1;

  const ranges = findRanges(groupTree, compoundKey, outlineLevels[groupedBy], maxLevel);

  groupSummaryItems.forEach((s) => {
    exportSummary(s, ranges)
  });
};

export const closeSheet: CloseSheetFn = (
  worksheet, groupTree, maxLevel, totalSummaryItems, exportSummary,
) => {
  worksheet.addRow({});

  totalSummaryItems.forEach((s) => {
    exportSummary(s, findRanges(groupTree, ROOT_GROUP, -1, maxLevel));
  });
};
