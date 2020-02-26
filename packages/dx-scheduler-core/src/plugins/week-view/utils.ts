import { PureComputed } from '@devexpress/dx-core';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
import { ViewCell, Group, GroupOrientation, TimeScaleLabelData, AllDayCell } from '../../types';
import { getCellKey } from '../grouping-panel/utils';
import { getGroupsLastRow } from '../integrated-grouping/helpers';

const getLabelsForSingleGroup: PureComputed<
  [Group[][], ViewCell[][], number, number], TimeScaleLabelData[]
> = (groups, cellsData, groupIndex, groupHeight) => {
  const currentGroupIndex = groupIndex * groupHeight;
  const nextGroupIndex = currentGroupIndex + groupHeight;

  return cellsData.slice(currentGroupIndex, nextGroupIndex - 1).reduce((
    acc: TimeScaleLabelData[], days: ViewCell[],
  ) => (([
    ...acc,
    {
      startDate: days[0].startDate,
      endDate: days[0].endDate,
      key: days[0].endDate + getCellKey(groups, groupIndex, groups.length - 1),
      groupingInfo: days[0].groupingInfo,
    },
  ])), [] as TimeScaleLabelData[]);
};

export const getLabelsForAllGroups: PureComputed<
  [ViewCell[][], Group[][], GroupOrientation], TimeScaleLabelData[][]
> = (cellsData, groups, groupOrientation) => {
  if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
    return [cellsData.map(cellsRow => ({
      startDate: cellsRow[0].startDate,
      endDate: cellsRow[0].endDate,
      groupingInfo: cellsRow[0].groupingInfo,
      key: cellsRow[0].endDate,
    }))];
  }

  const groupCount = getGroupsLastRow(groups).length;
  const singleGroupHeight = cellsData.length / groupCount;

  return getGroupsLastRow(groups).reduce((
    acc: TimeScaleLabelData[][], group: Group, groupIndex: number,
  ) => [
    ...acc,
    getLabelsForSingleGroup(
      groups, cellsData, groupIndex, singleGroupHeight,
    ) as TimeScaleLabelData[],
  ], [] as TimeScaleLabelData[][]);
};

export const prepareVerticalViewCellsData: PureComputed<
  [ViewCell[][], AllDayCell[][]], ViewCell[][][]
> = (cellsData, allDayCellsData) => {
  const groupCount = allDayCellsData ? allDayCellsData.length : 1;
  const validCellsData = [];
  const groupHeight = cellsData.length / groupCount;
  for (let i = 0; i < groupCount; i += 1) {
    validCellsData.push(cellsData.slice(i * groupHeight, (i + 1) * groupHeight));
  }
  return validCellsData;
};
