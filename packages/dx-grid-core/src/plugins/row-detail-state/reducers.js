import { toggle } from '../../utils/common-reducers';

export const toggleDetailRowExpanded = (
  prevExpanded, { rowId, state },
) => toggle(prevExpanded, [rowId], state);
