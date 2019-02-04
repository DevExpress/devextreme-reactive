import { testStatePluginField, setupConsole } from '@devexpress/dx-testing';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { RowDetailState } from './row-detail-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  toggleDetailRowExpanded: jest.fn(),
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
    toggleDetailRowExpanded.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  testStatePluginField({
    defaultDeps,
    Plugin: RowDetailState,
    propertyName: 'expandedRowIds',
    getterName: 'expandedDetailRowIds',
    values: [
      [0],
      [1],
      [2],
    ],
    actions: [{
      actionName: 'toggleDetailRowExpanded',
      reducer: toggleDetailRowExpanded,
    }],
  });
});
