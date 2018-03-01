import { setupConsole } from '@devexpress/dx-testing';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { RowDetailState } from './row-detail-state';
import { testStatePluginField } from '../utils/state-helper.test-utils';

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
    Plugin: RowDetailState,
    propertyName: 'expandedRowIds',
    getterName: 'expandedDetailRowIds',
    defaultDeps,
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
