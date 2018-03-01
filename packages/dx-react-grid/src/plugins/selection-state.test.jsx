import { setupConsole } from '@devexpress/dx-testing';
import { toggleSelection } from '@devexpress/dx-grid-core';
import { SelectionState } from './selection-state';
import { testStatePluginField } from '../utils/state-helper.test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleSelection: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

describe('SelectionState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    Plugin: SelectionState,
    propertyName: 'selection',
    defaultDeps,
    values: [
      [1],
      [2],
      [3],
    ],
    actions: [{
      actionName: 'toggleSelection',
      reducer: toggleSelection,
    }],
  });
});
