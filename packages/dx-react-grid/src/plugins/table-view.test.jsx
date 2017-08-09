import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
} from '@devexpress/dx-grid-core';
import { TableView } from './table-view';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  isNoDataTableRow: jest.fn(),
  isDataTableCell: jest.fn(),
  isHeaderStubTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'field' }],
    rows: [{ field: 1 }],
    getRowId: () => {},
  },
  action: {
    setColumnOrder: jest.fn(),
  },
  template: {
    body: undefined,
  },
};

const defaultProps = {
  tableTemplate: () => null,
  tableCellTemplate: () => null,
  tableStubCellTemplate: () => null,
  tableStubHeaderCellTemplate: () => null,
  tableNoDataCellTemplate: () => null,
};

describe('TableView', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithDataRows.mockImplementation(() => 'tableColumnsWithDataRows');
    tableRowsWithDataRows.mockImplementation(() => 'tableRowsWithDataRows');
    isNoDataTableRow.mockImplementation(() => false);
    isDataTableCell.mockImplementation(() => false);
    isHeaderStubTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should provide tableBodyRows', () => {
      const deps = {};

      mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableView
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(tableRowsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.rows, defaultDeps.getter.getRowId);
      expect(deps.computedGetter('tableBodyRows'))
        .toBe('tableRowsWithDataRows');
    });

    it('should extend tableColumns', () => {
      const deps = {
        checkGetter: (getter) => {
          expect(getter('tableColumns'))
            .toBe('tableColumnsWithDataRows');
        },
      };

      mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableView
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(tableColumnsWithDataRows)
        .toBeCalledWith(defaultDeps.getter.columns);
    });
  });

  it('should render data cell on user-defined column and row intersection', () => {
    isDataTableCell.mockImplementation(() => true);
    const tableCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableCellTemplate={tableCellTemplate}
        />
      </PluginHost>,
    );

    expect(isDataTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(tableCellTemplate)
      .toBeCalledWith({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
        column: tableCellArgs.tableColumn.column,
      });
  });

  it('should render stub cell on plugin-defined column and row intersection', () => {
    const tableStubCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableStubCellTemplate={tableStubCellTemplate}
        />
      </PluginHost>,
    );

    expect(tableStubCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });

  it('should render stub header cell on plugin-defined column and row intersection', () => {
    isHeaderStubTableCell.mockImplementation(() => true);
    const tableStubHeaderCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };
    const deps = {};

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableView
          {...defaultProps}
          tableTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableStubHeaderCellTemplate={tableStubHeaderCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, deps.computedGetter('tableHeaderRows'));
    expect(tableStubHeaderCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });

  it('should render no data cell if rows are empty', () => {
    isNoDataTableRow.mockImplementation(() => true);
    const tableNoDataCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {}, colSpan: 4 };

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableView
          {...defaultProps}
          tableTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableNoDataCellTemplate={tableNoDataCellTemplate}
        />
      </PluginHost>,
    );

    expect(isNoDataTableRow)
      .toBeCalledWith(tableCellArgs.tableRow);
    expect(tableNoDataCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });
});
