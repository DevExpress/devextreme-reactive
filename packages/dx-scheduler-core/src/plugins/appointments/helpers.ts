import { PureComputed } from '@devexpress/dx-core';
import { ViewCell, CellElementsMeta, GroupOrientation } from '../../types';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

export const isAllDayElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta, GroupOrientation, number], boolean
> = (viewCellsData, allDayElementsMeta, groupOrientation, groupCount) => {
  const numberOfRows = groupOrientation === HORIZONTAL_GROUP_ORIENTATION ? 1 : groupCount;
  return isElementsMetaActual(viewCellsData, allDayElementsMeta, numberOfRows);
};

export const isTimeTableElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta], boolean
> = (viewCellsData, timeTableElementsMeta) => isElementsMetaActual(
  viewCellsData, timeTableElementsMeta, viewCellsData.length,
);

const isElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta, number], boolean
> = (viewCellsData, elementsMeta, numberOfRows) => {
  if (!elementsMeta?.getCellRects) {
    return false;
  }

  const tableSize = numberOfRows * viewCellsData[0].length;
  return tableSize === elementsMeta.getCellRects.length;
};
