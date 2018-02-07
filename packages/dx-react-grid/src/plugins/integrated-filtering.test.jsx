import React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-grid-core';
import { IntegratedFiltering } from './integrated-filtering';
import { pluginDepsToComponents } from './test-utils';

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    columns: ['a', 'b'],
    searchValue: '',
    getCellValue: jest.fn(),
    isGroupRow: true,
    getRowLevelKey: jest.fn(),
    filters: [{ columnName: 'name' }],
  },
  plugins: ['FilteringState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  filteredRows: jest.fn().mockReturnValue([{ id: 0 }, { id: 1 } ])
}));

describe('IntegratedFiltering', () => {
  afterEach(() => {
    filteredRows.mockClear();
  });
  it('should exec filteredRows with correct arguments', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)} <IntegratedFiltering />
      </PluginHost>));
    expect(filteredRows).toHaveBeenCalledTimes(1);

    expect(filteredRows).toBeCalledWith(
      defaultDeps.getter.rows,
      defaultDeps.getter.filters,
      defaultDeps.getter.getCellValue,
      expect.any(Function),
      defaultDeps.getter.isGroupRow,
      defaultDeps.getter.getRowLevelKey,
    );
  });

  it('should exec filteredRows for searching and filtering', () => {
    const options = Object.assign({}, defaultDeps, {
      getter: { ...defaultDeps.getter, searchValue: 'searchValue' },
    });

    mount((
      <PluginHost>
        {pluginDepsToComponents(options)} <IntegratedFiltering />
      </PluginHost>));

    expect(filteredRows).toHaveBeenCalledTimes(2);
    expect(filteredRows).toHaveBeenLastCalledWith(
      defaultDeps.getter.rows,
      defaultDeps.getter.filters,
      defaultDeps.getter.getCellValue,
      expect.any(Function),
      defaultDeps.getter.isGroupRow,
      defaultDeps.getter.getRowLevelKey,
    );
  });
});
