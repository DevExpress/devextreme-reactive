import { toggle } from '../../utils/common-reducers';
import { ToggleRowsFieldReducer } from '../../types';

export const toggleSelection: ToggleRowsFieldReducer = (
  selection, { rowIds, state },
) => toggle(selection, rowIds, state);
