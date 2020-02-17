import { PureComputed } from '@devexpress/dx-core';
import { ViewCell, CellElementsMeta } from '../../types';

export const isAllDayElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta], boolean
> = (viewCellsData, allDayElementsMeta) => isElementsMetaActual(
  viewCellsData, allDayElementsMeta, 1,
);

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
