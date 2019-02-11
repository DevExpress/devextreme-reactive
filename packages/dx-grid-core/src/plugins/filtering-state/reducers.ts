import { Filter, ChangeFilterPayload } from '../../types';
import { PureReducer } from '@devexpress/dx-core';

export const changeColumnFilter: PureReducer<Filter[], ChangeFilterPayload> = (
  filters, { columnName, config },
) => {
  const filterIndex = filters.findIndex(f => f.columnName === columnName);
  const nextState = filters.slice();

  if (config) {
    const filter = { columnName, ...config };
    if (filterIndex > -1) {
      nextState.splice(filterIndex, 1, filter);
    } else {
      nextState.push(filter);
    }
  } else if (filterIndex > -1) {
    nextState.splice(filterIndex, 1);
  }

  return nextState;
};
