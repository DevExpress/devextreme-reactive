import { toggle } from '../../utils/common-reducers';

export const toggleSelection = (selection, { rowIds, state }) =>
  toggle(selection, rowIds, state);
