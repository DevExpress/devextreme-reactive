import { PureComputed } from '@devexpress/dx-core';
import { GroupingItem } from '../../types';

export const getCellKey: PureComputed<
  [GroupingItem[][], number, number], string
> = (groups, index, rowNumber) => {
  let currentIndex = index;
  return groups.reduceRight((acc: string, groupRow: GroupingItem[], rowIndex: number) => {
    if (rowNumber < rowIndex) return acc;
    const currentKey = groupRow[currentIndex].text;
    if (rowIndex > 0) {
      const currentRowLength = groups[rowIndex].length / groups[rowIndex - 1].length;
      currentIndex = Math.floor(currentIndex / currentRowLength);
    }
    return acc.concat(currentKey);
  }, '' as string);
};
