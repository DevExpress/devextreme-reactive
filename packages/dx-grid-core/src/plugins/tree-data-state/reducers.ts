import { toggle } from '../../utils/common-reducers';
import { ToggleRowFieldReducer } from '../../types';

export const toggleRowExpanded: ToggleRowFieldReducer = (
  prevExpanded, { rowId, state },
) => toggle(prevExpanded, [rowId], state);
