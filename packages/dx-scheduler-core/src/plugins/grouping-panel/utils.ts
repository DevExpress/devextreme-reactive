import { PureComputed } from '@devexpress/dx-core';
import { Group, GroupingCellData } from '../../types';

export const getCellKey: PureComputed<
  [Group[][], number, number], string
> = (groups, index, rowNumber) => {
  let currentIndex = index;
  return groups.reduceRight((acc: string, groupRow: Group[], rowIndex: number) => {
    if (rowNumber < rowIndex) return acc;
    const currentKey = groupRow[currentIndex].text;
    if (rowIndex > 0) {
      const currentRowLength = groups[rowIndex].length / groups[rowIndex - 1].length;
      currentIndex = Math.floor(currentIndex / currentRowLength);
    }
    return acc.concat(currentKey);
  }, '' as string);
};

export const getRowFromGroups: PureComputed<
  [number, Group[], any, Group[][], number], GroupingCellData[]
> = (width, groupRow, cellStyle, groups, rowIndex) => {
  let row = [] as any[];
  const currentRowLength = groupRow.length;
  const standardWidth = width / groups[groups.length - 1].length;
  const colSpan = groups[groups.length - 1].length / currentRowLength;
  for (let i = 0; i < standardWidth; i += 1) {
    row = [...row, ...groupRow.reduce((acc, group, index) => [
      ...acc,
      {
        group,
        colSpan,
        key: getCellKey(groups, index, rowIndex) + i,
        left: cellStyle.left,
        brightRightBorder: index === currentRowLength - 1,
      },
    ], [] as any[])];
  }
  return row;
};
