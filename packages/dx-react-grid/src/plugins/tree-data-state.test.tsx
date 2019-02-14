import { testStatePluginField, setupConsole } from '@devexpress/dx-testing';
import { toggleRowExpanded } from '@devexpress/dx-grid-core';
import { TreeDataState } from './tree-data-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleRowExpanded: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('RowDetailState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    toggleRowExpanded.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    Plugin: TreeDataState,
    propertyName: 'expandedRowIds',
    getterName: 'expandedRowIds',
    values: [
      [0],
      [1],
      [2],
    ],
    actions: [{
      actionName: 'toggleRowExpanded',
      reducer: toggleRowExpanded,
    }],
  });
});
