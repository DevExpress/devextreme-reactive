import { toggle } from '../../utils/common-reducers';

export const toggleRowExpanded = (
  prevExpanded, { rowId, state },
) => toggle(prevExpanded, [rowId], state);
