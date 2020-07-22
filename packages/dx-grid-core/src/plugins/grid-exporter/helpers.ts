// tslint:disable-next-line: no-submodule-imports
import * as Excel from 'exceljs';
import { PureComputed } from '@devexpress/dx-core';
import {
  TableColumn, FindRangesFn, ExportRowsFn,
  CloseSheetFn,
  ExportSummaryItemsFn,
  RemoveEmptyGroupsFn,
} from '../../types';
import { ROOT_GROUP, DEFAULT_COLUMN_WIDTH } from './constants';

export const exportHeader = (worksheet: Excel.Worksheet, columns: TableColumn[]) => {
  const cols = columns
    .map(({ column, width }) => ({
      width: (width as number || DEFAULT_COLUMN_WIDTH) / 8,
      key: column?.name,
    }));
  worksheet.columns = cols;

  const headerRow = columns.reduce((acc, { column: { name, title } = {} }) => ({
    ...acc,
    [name!]: title,
  }), {});
  worksheet.addRow(headerRow);

  worksheet.views.push({
    state: 'frozen', ySplit: worksheet.lastRow!.number,
  });
};

export const findRanges: FindRangesFn = (groupTree, compoundKey, level, maxLevel, result = []) => {
  if (level !== maxLevel) {
    const ranges = (groupTree[compoundKey] as string[]).reduce((acc, groupKey) => (
      [...acc, ...findRanges(groupTree, groupKey, level + 1, maxLevel, result)]
    ), [] as Array<number[]>);
    return [...result, ...ranges];
  }
  return [...result, groupTree[compoundKey] as number[]];
};

export const exportRows: ExportRowsFn = (
  worksheet, allRows, dataColumns, columns, isGroupRow, outlineLevels,
  rowsOffset, getCellValue, getCloseGroup, customizeCell,
) => {
  let currentLevel = 0;
  let openGroups: any[] = [];
  const closeGroup = getCloseGroup(rowsOffset);

  allRows.forEach((row) => {
    let excelRow;

    if (isGroupRow && isGroupRow(row)) {
      currentLevel = outlineLevels[row.groupedBy];

      // close nested groups first
      openGroups.slice(currentLevel).reverse().forEach(closeGroup);

      openGroups = openGroups.slice(0, currentLevel);
      openGroups[currentLevel] = { groupedBy: row.groupedBy, compoundKey: row.compoundKey };

      // add group row
      const title = dataColumns.find(({ name }) => name === row.groupedBy)?.title;
      excelRow = { [columns[0].column!.name]: `${title}: ${row.value}` };

      worksheet.addRow(excelRow);
      const lastIndex = worksheet.lastRow!.number;

      // merge into single cell
      worksheet.mergeCells(lastIndex, 1, lastIndex, columns.length);
      worksheet.lastRow!.getCell(1).font = { bold: true };

      if (currentLevel > 0) {
        worksheet.lastRow!.outlineLevel = currentLevel;
      }
      currentLevel += 1;
    } else {
      excelRow = columns.reduce((acc, { column }) => ({
        ...acc,
        ...(column ? { [column.name]: getCellValue(row, column.name) } : null),
      }), {});
      worksheet.addRow(excelRow);
      worksheet.lastRow!.outlineLevel = currentLevel;
    }

    worksheet.lastRow!.eachCell((cell, colNumber) => {
      customizeCell(cell, row, columns[colNumber - 1].column!);
    });
  });

  openGroups.reverse().forEach(closeGroup);
};

export const closeSheet: CloseSheetFn = (
  worksheet, groupTree, maxGroupLevel, rowsOffset, totalSummaryItems, exportSummary,
) => {
  exportSummaryItems(
    worksheet, groupTree, totalSummaryItems, ROOT_GROUP, -1,
    rowsOffset, maxGroupLevel, exportSummary,
  );
};

export const normalizeRanges: PureComputed<[number[][], number]> = (ranges, offset) => (
  ranges.map(range => range.map(index => + index + offset))
);

export const exportSummaryItems: ExportSummaryItemsFn = (
  worksheet, groupTree, summaryItems, groupKey, groupLevel,
  rowsOffset, maxGroupLevel, exportSummary,
) => {
  if (!summaryItems) return;

  worksheet.addRow({});

  const ranges = normalizeRanges(
    findRanges(groupTree, groupKey, groupLevel, maxGroupLevel),
    rowsOffset,
  );

  summaryItems.forEach((s) => {
    exportSummary(s, ranges);
  });
};

export const removeEmptyGroups: RemoveEmptyGroupsFn = (rows, grouping, isGroupRow) => {
  if (!grouping) return rows;

  const groupingColumns = grouping.map(({ columnName }) => columnName);
  const result: any[] = [];
  let groupChain: any[] = [];

  rows.forEach((row) => {
    if (isGroupRow(row)) {
      const level = groupingColumns.indexOf(row.groupedBy);
      if (level === groupChain.length) {
        groupChain.push(row);
      } else {
        groupChain = [...groupChain.slice(0, level), row];
      }
    } else {
      if (groupChain.length > 0) {
        result.push(...groupChain);
        groupChain = Array.from({ length: groupChain.length });
      }
      result.push(row);
    }
  });

  return result.filter(row => !!row);
};
