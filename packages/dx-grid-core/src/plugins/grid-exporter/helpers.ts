import * as Excel from 'exceljs';
import { TableColumn, FilterSelectedRowsFn, BuildGroupTreeFn, FindRangesFn } from "../../types";
import { ROOT_GROUP } from './constants';

export const filterSelectedRows: FilterSelectedRowsFn = (rows, getRowId, selection) => {
  const selectionSet = new Set<any>(selection);
  return rows.filter(row => selectionSet.has(getRowId(row)));
};

export const exportHeader = (worksheet: Excel.Worksheet, columns: TableColumn[]) => {
  const cols = columns
    .map(({ column, width }) => ({ ...column!, width: (width as number || 150 / 8) }))
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

export const buildGroupTree: BuildGroupTreeFn = (allRows, outlineLevels, startIndex) => {
  const groupTree = { [ROOT_GROUP]: [] as any[] };
  const maxLevel = Object.keys(outlineLevels).length - 1;

  let parentChain = {};
  let lastDataIndex = 0;
  let openGroup = '';
  let index = startIndex;
  let level = 0;
  let prevLevel = 0;

  allRows.forEach((row) => {
    const { groupedBy, compoundKey } = row;
    if (groupedBy) {
      level = outlineLevels[groupedBy];
      if (level === 0) {
        groupTree[ROOT_GROUP].push(compoundKey);
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

  if (openGroup) {
    groupTree[openGroup].push(lastDataIndex);
  }

  // TODO: consider grouping instead
  if (Object.keys(groupTree).length === 1 && groupTree[ROOT_GROUP].length === 0) {
    groupTree[ROOT_GROUP] = [startIndex, startIndex + allRows.length - 1];
  }

  return groupTree;
};

export const findRanges: FindRangesFn = (groupTree, compoundKey, level, maxLevel, result) => {
  if (level !== maxLevel) {
    const ranges = (groupTree[compoundKey] as string[]).reduce((acc, groupKey) => (
      [...acc, ...findRanges(groupTree, groupKey, level + 1, maxLevel, result)]
    ), [] as Array<number[]>);
    return [...result, ...ranges];
  } else {
    return [...result, groupTree[compoundKey] as number[]];
  }
};
