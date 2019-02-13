import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { sortedRows } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { IntegratedSorting } from './integrated-sorting';

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    columns: ['a', 'b'],
    getCellValue: jest.fn(),
    isGroupRow: true,
    getRowLevelKey: jest.fn(),
    sorting: [{ columnName: 'name' }],
  },
  plugins: ['SortingState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  sortedRows: jest.fn(),
}));

describe('IntegratedFiltering', () => {
  beforeEach(() => {
    sortedRows.mockImplementation(() => 'sortedRows');
  });

  afterEach(() => {
    sortedRows.mockClear();
  });

  it('should exec sortedRows with correct arguments', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSorting />
      </PluginHost>
    ));
    expect(sortedRows).toHaveBeenCalledTimes(1);

    expect(sortedRows).toBeCalledWith(
      defaultDeps.getter.rows,
      defaultDeps.getter.sorting,
      defaultDeps.getter.getCellValue,
      expect.any(Function),
      defaultDeps.getter.isGroupRow,
      defaultDeps.getter.getRowLevelKey,
    );
  });
});
