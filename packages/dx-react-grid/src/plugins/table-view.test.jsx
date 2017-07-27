import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  PluginHost,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithDataRows,
  tableRowsWithDataRows,
  isNoDataTableRow,
  isDataTableCell,
  isHeaderStubTableCell,
} from '@devexpress/dx-grid-core';
import { TableView } from './table-view';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  isNoDataTableRow: jest.fn(),
  isDataTableCell: jest.fn(),
  isHeaderStubTableCell: jest.fn(),
}));

const defaultPluginProps = {
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
      let tableBodyRows = null;
      mount(
        <PluginHost>
          <Getter name="rows" value="rows" />
          <Getter name="getRowId" value="getRowId" />
          <TableView
            {...defaultPluginProps}
          />
          <Template
            name="root"
            connectGetters={getter => (tableBodyRows = getter('tableBodyRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableRowsWithDataRows)
        .toBeCalledWith('rows', 'getRowId');
      expect(tableBodyRows)
        .toBe('tableRowsWithDataRows');
    });

    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="columns" value="columns" />
          <TableView
            {...defaultPluginProps}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithDataRows)
        .toBeCalledWith('columns');
      expect(tableColumns)
        .toBe('tableColumnsWithDataRows');
    });
  });

  it('should render data cell on user-defined column and row intersection', () => {
    isDataTableCell.mockImplementation(() => true);

    const tableCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          {...defaultPluginProps}
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
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          {...defaultPluginProps}
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

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          {...defaultPluginProps}
          tableTemplate={({ cellTemplate }) => cellTemplate(tableCellArgs)}
          tableStubHeaderCellTemplate={tableStubHeaderCellTemplate}
        />
        <Getter name="tableHeaderRows" value="tableHeaderRows" />
      </PluginHost>,
    );

    expect(isHeaderStubTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, 'tableHeaderRows');
    expect(tableStubHeaderCellTemplate)
      .toBeCalledWith(tableCellArgs);
  });

  it('should render no data cell if rows are empty', () => {
    isNoDataTableRow.mockImplementation(() => true);

    const tableNoDataCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {}, colspan: 4 };

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          {...defaultPluginProps}
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
