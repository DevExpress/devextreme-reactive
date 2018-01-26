import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeColumnFilter, getColumnExtensionValue } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { FilteringState } from './filtering-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnFilter: jest.fn(),
  getColumnExtensionValue: jest.fn(),
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
    getColumnExtensionValue.mockImplementation(() => ((() => {})));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide filters defined in defaultFilters property', () => {
    const defaultFilters = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <FilteringState
          defaultFilters={defaultFilters}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).filters)
      .toBe(defaultFilters);
  });

  it('should provide filters defined in filters property', () => {
    const filters = [{ columnName: 'a', value: 'a' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <FilteringState
          filters={filters}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).filters)
      .toBe(filters);
  });

  it('should fire the "onFiltersChange" callback and should change filters in uncontrolled mode after the "changeColumnFilter" action is fired', () => {
    const defaultFilters = [{ columnName: 'a', value: 'a' }];
    const newFilters = [{ columnName: 'b', value: 'a' }];

    const filtersChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <FilteringState
          defaultFilters={defaultFilters}
          onFiltersChange={filtersChange}
        />
      </PluginHost>
    ));

    const payload = {};
    changeColumnFilter.mockReturnValue(newFilters);
    executeComputedAction(tree, actions => actions.changeColumnFilter(payload));

    expect(changeColumnFilter)
      .toBeCalledWith(defaultFilters, payload);

    expect(getComputedState(tree).filters)
      .toBe(newFilters);

    expect(filtersChange)
      .toBeCalledWith(newFilters);
  });

  it('should fire the "onFiltersChange" callback and should change filters in controlled mode after the "changeColumnFilter" action is fired', () => {
    const filters = [{ columnName: 'a', value: 'a' }];
    const newFilters = [{ columnName: 'b', value: 'a' }];

    const filtersChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <FilteringState
          filters={filters}
          onFiltersChange={filtersChange}
        />
      </PluginHost>
    ));

    const payload = {};
    changeColumnFilter.mockReturnValue(newFilters);
    executeComputedAction(tree, actions => actions.changeColumnFilter(payload));

    expect(changeColumnFilter)
      .toBeCalledWith(filters, payload);

    expect(getComputedState(tree).filters)
      .toBe(filters);

    expect(filtersChange)
      .toBeCalledWith(newFilters);
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultFilters = [1];
      const transitionalFilters = [2];
      const newFilters = [3];
      const payload = {};

      const filtersChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState
            defaultFilters={defaultFilters}
            onFiltersChange={filtersChange}
          />
        </PluginHost>
      ));

      changeColumnFilter.mockReturnValueOnce(transitionalFilters);
      changeColumnFilter.mockReturnValueOnce(newFilters);
      executeComputedAction(tree, (actions) => {
        actions.changeColumnFilter(payload);
        actions.changeColumnFilter(payload);
      });

      expect(changeColumnFilter)
        .lastCalledWith(transitionalFilters, payload);

      expect(filtersChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const filters = [1];
      const transitionalFilters = [2];
      const newFilters = [3];
      const payload = {};

      const filtersChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState
            filters={filters}
            onFiltersChange={filtersChange}
          />
        </PluginHost>
      ));

      changeColumnFilter.mockReturnValueOnce(transitionalFilters);
      changeColumnFilter.mockReturnValueOnce(newFilters);
      executeComputedAction(tree, (actions) => {
        actions.changeColumnFilter(payload);
        actions.changeColumnFilter(payload);
      });

      expect(changeColumnFilter)
        .lastCalledWith(transitionalFilters, payload);

      expect(filtersChange)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValue by default', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState />
        </PluginHost>
      ));

      expect(getColumnExtensionValue)
        .toBeCalledWith(undefined, 'filteringEnabled', true);
    });

    it('should correctly call getColumnExtensionValue if columnFilteringEnabled prop is false', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState
            columnFilteringEnabled={false}
          />
        </PluginHost>
      ));

      expect(getColumnExtensionValue)
        .toBeCalledWith(undefined, 'filteringEnabled', false);
    });

    it('should correctly call getColumnExtensionValue if columnExtensions prop is defined', () => {
      const columnExtensions = [{ columnName: 'a', filteringEnabled: true }];
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <FilteringState
            columnExtensions={columnExtensions}
          />
        </PluginHost>
      ));

      expect(getColumnExtensionValue)
        .toBeCalledWith(columnExtensions, 'filteringEnabled', true);
    });
  });
});
