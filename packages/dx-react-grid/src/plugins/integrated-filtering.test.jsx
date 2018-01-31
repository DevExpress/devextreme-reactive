import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  filteredRows,
  filteredCollapsedRowsGetter,
  getColumnExtension,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { IntegratedFiltering } from './integrated-filtering';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  filteredRows: jest.fn(),
  filteredCollapsedRowsGetter: jest.fn(),
  getColumnExtension: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    filters: [{ columnName: 'a' }],
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
    filteredRows.mockImplementation(() => 'filteredRows');
    filteredCollapsedRowsGetter.mockImplementation(() => 'filteredCollapsedRowsGetter');
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
      .toBe(filteredRows());

    expect(filteredRows)
      .toBeCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.filters,
        defaultDeps.getter.getCellValue,
        expect.any(Function),
        defaultDeps.getter.getRowLevelKey,
        defaultDeps.getter.getCollapsedRows,
      );
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
      .toBeCalledWith(
        defaultDeps.getter.getCollapsedRows,
        defaultDeps.getter.filters,
        defaultDeps.getter.getCellValue,
        expect.any(Function),
      );
  });
});
