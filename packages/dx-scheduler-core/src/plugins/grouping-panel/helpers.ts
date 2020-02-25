import { PureComputed } from '@devexpress/dx-core';
import { CellElementsMeta, GroupOrientation } from '../../types';
import { VERTICAL_GROUP_ORIENTATION } from '../../constants';

export const calculateGroupingPanelHeight: PureComputed<
  [CellElementsMeta, CellElementsMeta, boolean, GroupOrientation], number
> = (timeTableElementsMeta, allDayElementsMeta, allDayPanelExists, groupOrientation) => {
  if (!timeTableElementsMeta.getCellRects) {
    return 0;
  }

  const timeTableRects = timeTableElementsMeta.getCellRects;
  const allDayRects = allDayElementsMeta?.getCellRects;

  const bottom = timeTableRects[timeTableRects.length - 1]().bottom;
  const top = allDayPanelExists && groupOrientation === VERTICAL_GROUP_ORIENTATION
    ? allDayRects[0]().top
    : timeTableRects[0]().top;

  return bottom - top;
};
