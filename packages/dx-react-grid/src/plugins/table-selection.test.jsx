import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithSelection,
  tableRowsWithSelection,
  tableExtraPropsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
} from '@devexpress/dx-grid-core';
import { TableSelection } from './table-selection';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithSelection: jest.fn(),
  tableRowsWithSelection: jest.fn(),
  tableExtraPropsWithSelection: jest.fn(),
  isSelectTableCell: jest.fn(),
  isSelectAllTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', column: 'column' }],
    tableBodyRows: [{ type: 'undefined', rowId: 1, row: 'row' }],
    tableExtraProps: { onClick: () => {} },
    selection: [1, 2],
    availableToSelect: [1, 2, 3, 4],
  },
  action: {
    setRowsSelection: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
  },
  plugins: ['SelectionState', 'TableView'],
};

const defaultProps = {
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
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSelection
            {...defaultProps}
            highlightSelected
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableBodyRows)
        .toBe('tableRowsWithSelection');
      expect(tableRowsWithSelection)
        .toHaveBeenCalledWith(defaultDeps.getter.tableBodyRows, defaultDeps.getter.selection);
    });

    it('should extend tableColumns', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSelection
            {...defaultProps}
            selectionColumnWidth={120}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithSelection');
      expect(tableColumnsWithSelection)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });

    it('should extend tableExtraProps', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableSelection
            {...defaultProps}
            selectByRowClick
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableExtraProps)
        .toBe('tableExtraPropsWithSelection');
      expect(tableExtraPropsWithSelection)
        .toBeCalledWith(defaultDeps.getter.tableExtraProps, expect.any(Function));
    });
  });

  it('should render selectAll cell on select column and heading row intersection', () => {
    isSelectTableCell.mockImplementation(() => true);
    const selectCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectCellTemplate={selectCellTemplate}
        />
      </PluginHost>,
    );

    expect(isSelectTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(selectCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
      }));
  });

  it('should render select cell on select column and user-defined row intersection', () => {
    isSelectAllTableCell.mockImplementation(() => true);
    const selectAllCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableSelection
          {...defaultProps}
          selectAllCellTemplate={selectAllCellTemplate}
        />
      </PluginHost>,
    );

    expect(isSelectTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(selectAllCellTemplate)
      .toBeCalledWith(expect.objectContaining(defaultDeps.template.tableViewCell));
  });
});
