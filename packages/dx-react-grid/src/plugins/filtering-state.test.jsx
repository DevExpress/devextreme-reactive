import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeColumnFilter, getColumnExtensionValueGetter } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { FilteringState } from './filtering-state';
import { testStatePluginField } from '../utils/state-helper.test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnFilter: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  pushFilterExpression: jest.fn().mockImplementation(() => jest.fn().mockReturnValue('filters')),
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

  beforeEach(() => {
    changeColumnFilter.mockImplementation(() => []);
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
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

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter', () => {
      const columnExtensions = [{ columnName: 'a', filteringEnabled: true }];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState
            columnFilteringEnabled={false}
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'filteringEnabled', false);
    });
  });

  describe('filter expression', () => {
    it('should provide filter expression', () => {
      const defaultFilters = [{ columnName: 'a', value: 'a' }];

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState
            defaultFilters={defaultFilters}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).filterExpression)
        .toEqual('filters');
    });
  });
});
