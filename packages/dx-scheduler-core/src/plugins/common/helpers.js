import { VERTICAL_TYPE, HORIZONTAL_TYPE } from '../../constants';

const MONTH_TYPE = 'month';

export const getViewType = (currentViewType) => {
  if (currentViewType === MONTH_TYPE) return HORIZONTAL_TYPE;
  return VERTICAL_TYPE;
};
