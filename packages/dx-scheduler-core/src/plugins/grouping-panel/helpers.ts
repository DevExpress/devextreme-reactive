import { PureComputed } from '@devexpress/dx-core';
import { CellElementsMeta } from '../../types';

export const calculateGroupingPanelHeight: PureComputed<
  [CellElementsMeta, CellElementsMeta, boolean], number
> = (timeTableElementsMeta, allDayElementsMeta, allDayPanelExists) => {
  if (!timeTableElementsMeta.getCellRects) {
    return 0;
  }

  const timeTableRects = timeTableElementsMeta.getCellRects;
  const allDayRects = allDayElementsMeta?.getCellRects;

  const bottom = timeTableRects[timeTableRects.length - 1]().bottom;
  const top = allDayPanelExists ? allDayRects[0]().top : timeTableRects[0]().top;

  return bottom - top;
};
