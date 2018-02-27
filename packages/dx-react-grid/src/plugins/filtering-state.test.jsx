import { setupConsole } from '@devexpress/dx-testing';
import { changeColumnFilter } from '@devexpress/dx-grid-core';
import { FilteringState } from './filtering-state';
import { testStatePluginField } from '../utils/state-helper.test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnFilter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('FilteringState', () => {
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
    Plugin: FilteringState,
    propertyName: 'filters',
    defaultDeps,
    values: [
      [{ columnName: 'a', value: 'a' }],
      [{ columnName: 'b', value: 'a' }],
      [{ columnName: 'c', value: 'a' }],
    ],
    actions: [{
      actionName: 'changeColumnFilter',
      reducer: changeColumnFilter,
    }],
  });
});
