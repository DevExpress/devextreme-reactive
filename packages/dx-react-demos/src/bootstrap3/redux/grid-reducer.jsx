import {
  generateRows,
} from '../../demoData';

export const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';

const gridInitialState = {
  columns: [
    { name: 'name', title: 'Name' },
    { name: 'sex', title: 'Sex' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ],
  rows: generateRows({ length: 105 }),
  sortings: [{ column: 'id', direction: 'asc' }],
  selection: [1, 3, 18],
  expandedDetails: [3],
  filters: [],
  currentPage: 0,
};

const gridReducer = (state = gridInitialState, action) => {
  if (action.type === GRID_STATE_CHANGE_ACTION) {
    const nextState = Object.assign(
      {},
      state,
      {
        [action.partialStateName]: action.partialStateValue,
      },
    );
    return nextState;
  }
  return state;
};

export const createGridAction = (partialStateName, partialStateValue) => ({
  type: GRID_STATE_CHANGE_ACTION,
  partialStateName,
  partialStateValue,
});

export default gridReducer;
