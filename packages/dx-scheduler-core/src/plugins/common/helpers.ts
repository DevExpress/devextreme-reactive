import { PureComputed } from '@devexpress/dx-core';
import { VERTICAL_TYPE, HORIZONTAL_TYPE } from '../../constants';
import { CurrentViewType } from '../../types';

const MONTH_TYPE = 'month';

export const getViewType: PureComputed<[CurrentViewType], string> = (currentViewType) => {
  if (currentViewType === MONTH_TYPE) return HORIZONTAL_TYPE;
  return VERTICAL_TYPE;
};
