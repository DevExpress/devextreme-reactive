import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  checkTableColumnExtensions
} from '@devexpress/dx-grid-core';
import { TableColumnsWithDataRowsGetter } from './table-columns-getter';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  checkTableColumnExtensions: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'field' }],
    rows: [{ field: 1 }],
    getRowId: () => {},
    getCellValue: () => {},
    isDataLoading: false,
  },
  template: {
    body: undefined,
  },
};

beforeEach(() => {
  tableColumnsWithDataRows.mockImplementation(() => 'tableColumnsWithDataRows');
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('TableColumnsWithDataRowsGetter', () => {
  const columnExtensions = [{ columnName: 'field', width: 100 }];

  it('should extend tableColumns', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnsWithDataRowsGetter
          columnExtensions={columnExtensions}
        />
      </PluginHost>
    ));

    expect(tableColumnsWithDataRows)
      .toBeCalledWith(defaultDeps.getter.columns, columnExtensions);
    expect(getComputedState(tree).tableColumns)
      .toBe('tableColumnsWithDataRows');
  });

  it('should validate column extensions', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnsWithDataRowsGetter
          columnExtensions={columnExtensions}
        />
      </PluginHost>
    ));

    expect(checkTableColumnExtensions)
      .toBeCalledWith(columnExtensions);
  });
});
