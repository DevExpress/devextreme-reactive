import { PureComputed } from '@devexpress/dx-core';
import { ViewCell, CellElementsMeta, GroupOrientation } from '../../types';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

export const isAllDayElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta, GroupOrientation, number], boolean
> = (viewCellsData, allDayElementsMeta, groupOrientation, numberOfGroups) => {
  if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
    return allDayElementsMeta.getCellRects?.length === viewCellsData[0].length;
  }

  const allDayPanelSize = viewCellsData[0].length * numberOfGroups;
  return allDayElementsMeta.getCellRects?.length === allDayPanelSize;
};

export const isTimeTableElementsMetaActual: PureComputed<
  [CellElementsMeta], boolean
> = timeTableElementsMeta => !!timeTableElementsMeta.getCellRects;
