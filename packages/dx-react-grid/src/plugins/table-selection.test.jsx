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
  tableColumnsWithSelection,
  tableRowsWithSelection,
  tableExtraPropsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
} from '@devexpress/dx-grid-core';
import { TableSelection } from './table-selection';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithSelection: jest.fn(),
  tableRowsWithSelection: jest.fn(),
  tableExtraPropsWithSelection: jest.fn(),
  isSelectTableCell: jest.fn(),
  isSelectAllTableCell: jest.fn(),
}));

const defaultPluginProps = {
  selectAllCellTemplate: () => null,
  selectCellTemplate: () => null,
  selectionColumnWidth: 100,
};

describe('TableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithSelection.mockImplementation(() => 'tableColumnsWithSelection');
    tableRowsWithSelection.mockImplementation(() => 'tableRowsWithSelection');
    tableExtraPropsWithSelection.mockImplementation(() => 'tableExtraPropsWithSelection');
    isSelectTableCell.mockImplementation(() => false);
    isSelectAllTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      let tableBodyRows = null;
      // TODO: extract plugin dependencies
      mount(
        <PluginHost>
          <Getter name="tableBodyRows" value="tableBodyRows" />
          <Getter name="selection" value="selection" />
          <Getter name="getRowId" value="getRowId" />
          <TableSelection
            {...defaultPluginProps}
            highlightSelected
          />
          <Template
            name="root"
            connectGetters={getter => (tableBodyRows = getter('tableBodyRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableRowsWithSelection)
        .toBeCalledWith('tableBodyRows', 'selection', 'getRowId');
      expect(tableBodyRows)
        .toBe('tableRowsWithSelection');
    });

    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />
          <TableSelection
            {...defaultPluginProps}
            selectionColumnWidth={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithSelection)
        .toBeCalledWith('tableColumns', 120);
      expect(tableColumns)
        .toBe('tableColumnsWithSelection');
    });

    it('should extend tableExtraProps', () => {
      let tableExtraProps = null;
      mount(
        <PluginHost>
          <Getter name="tableExtraProps" value="tableExtraProps" />
          <Getter name="getRowId" value="getRowId" />
          <TableSelection
            {...defaultPluginProps}
            selectByRowClick
          />
          <Template
            name="root"
            connectGetters={getter => (tableExtraProps = getter('tableExtraProps'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableExtraPropsWithSelection)
        .toBeCalledWith('tableExtraProps', expect.any(Function), 'getRowId');
      expect(tableExtraProps)
        .toBe('tableExtraPropsWithSelection');
    });
  });

  it('should render selectAll cell on select column and heading row intersection', () => {
    isSelectTableCell.mockImplementation(() => true);

    const selectCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Getter name="selection" value={[]} />
        <Getter name="availableToSelect" value={[]} />
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableSelection
          {...defaultPluginProps}
          selectCellTemplate={selectCellTemplate}
        />
      </PluginHost>,
    );

    expect(isSelectTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(selectCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...tableCellArgs,
        row: tableCellArgs.tableRow.row,
      }));
  });

  it('should render select cell on select column and user-defined row intersection', () => {
    isSelectAllTableCell.mockImplementation(() => true);

    const selectAllCellTemplate = jest.fn(() => null);
    const tableCellArgs = { tableRow: { row: 'row' }, tableColumn: { column: 'column' }, style: {} };

    mount(
      <PluginHost>
        <Getter name="selection" value={[]} />
        <Getter name="availableToSelect" value={[]} />
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={tableCellArgs}
          />
        </Template>
        <TableSelection
          {...defaultPluginProps}
          selectAllCellTemplate={selectAllCellTemplate}
        />
      </PluginHost>,
    );

    expect(isSelectTableCell)
      .toBeCalledWith(tableCellArgs.tableRow, tableCellArgs.tableColumn);
    expect(selectAllCellTemplate)
      .toBeCalledWith(expect.objectContaining(tableCellArgs));
  });
});
