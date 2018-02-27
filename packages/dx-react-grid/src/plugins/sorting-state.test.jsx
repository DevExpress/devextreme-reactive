import { setupConsole } from '@devexpress/dx-testing';
import { changeColumnSorting } from '@devexpress/dx-grid-core';
import { SortingState } from './sorting-state';
import { testStatePluginField } from '../utils/state-helper.test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnSorting: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

describe('SortingState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    changeColumnSorting.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    Plugin: SortingState,
    propertyName: 'sorting',
    defaultDeps,
    values: [
      [{ columnName: 'a', direction: 'asc' }],
      [{ columnName: 'b', direction: 'desc' }],
      [{ columnName: 'c', direction: 'asc' }],
    ],
    actions: [{
      actionName: 'changeColumnSorting',
      reducer: changeColumnSorting,
      fieldReducer: false,
    }],
  });
});
