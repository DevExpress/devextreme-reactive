import { PureComputed } from '@devexpress/dx-core';
import { ViewCell, CellElementsMeta } from '../../types';

export const isAllDayElementsMetaActual: PureComputed<
  [ViewCell[][], CellElementsMeta], boolean
> = (viewCellsData, allDayElementsMeta) => allDayElementsMeta.getCellRects
  && (allDayElementsMeta.getCellRects.length === viewCellsData[0].length);

export const isTimeTableElementsMetaActual: PureComputed<
  [CellElementsMeta], boolean
> = timeTableElementsMeta => !!timeTableElementsMeta.getCellRects;
