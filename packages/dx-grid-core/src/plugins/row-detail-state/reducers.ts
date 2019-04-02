import { toggle } from '../../utils/common-reducers';
import { ToggleRowFieldReducer } from '../../types';

export const toggleDetailRowExpanded: ToggleRowFieldReducer = (
  prevExpanded, { rowId, state },
) => toggle(prevExpanded, [rowId], state);
