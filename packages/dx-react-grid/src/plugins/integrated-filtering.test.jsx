import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import {
  filteredRows,
  unwrappedFilteredRows,
  filteredCollapsedRowsGetter,
  getColumnExtension,
  defaultFilterPredicate,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { IntegratedFiltering } from './integrated-filtering';

jest.mock('@devexpress/dx-grid-core', () => ({
  filteredRows: jest.fn(),
  filteredCollapsedRowsGetter: jest.fn(),
  unwrappedFilteredRows: jest.fn(),
  getColumnExtension: jest.fn(),
  defaultFilterPredicate: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    filterExpression: [{ columnName: 'a' }],
    getCellValue: () => {},
    getCollapsedRows: () => [],
    getRowLevelKey: () => undefined,
  },
  plugins: ['FilteringState'],
};

describe('IntegratedFiltering', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    filteredRows.mockImplementation(() => ({ rows: 'filteredRows' }));
    filteredCollapsedRowsGetter.mockImplementation(() => 'filteredCollapsedRowsGetter');
    unwrappedFilteredRows.mockImplementation(() => 'unwrappedFilteredRows');
    getColumnExtension.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide rows getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedFiltering />
      </PluginHost>
    ));

    expect(getComputedState(tree).rows)
      .toBe(unwrappedFilteredRows());

    expect(filteredRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.filterExpression,
        defaultDeps.getter.getCellValue,
        expect.any(Function),
        defaultDeps.getter.getRowLevelKey,
        defaultDeps.getter.getCollapsedRows,
      );

    expect(unwrappedFilteredRows)
      .toBeCalledWith(filteredRows());
  });

  it('should provide getCollapsedRows getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedFiltering />
      </PluginHost>
    ));

    expect(getComputedState(tree).getCollapsedRows)
      .toBe(filteredCollapsedRowsGetter());

    expect(filteredCollapsedRowsGetter)
      .toBeCalledWith(filteredRows());
  });

  it('should provide the default filter predicate as a static field', () => {
    expect(IntegratedFiltering.defaultPredicate)
      .toEqual(defaultFilterPredicate);
  });
});
