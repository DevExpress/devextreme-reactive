import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';
import { SortingState } from './sorting-state';
import { testStatePluginField } from '../utils/state-helper.test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnSorting: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  getPersistentSortedColumns: jest.fn(),
  calculateKeepOther: jest.fn(),
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
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
    getPersistentSortedColumns.mockImplementation(() => []);
    calculateKeepOther.mockImplementation((sorting, keepOther) => keepOther);
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

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter', () => {
      const columnExtensions = [{ columnName: 'a', sortingEnabled: true }];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SortingState
            columnSortingEnabled={false}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'sortingEnabled', false);
    });
  });
});
