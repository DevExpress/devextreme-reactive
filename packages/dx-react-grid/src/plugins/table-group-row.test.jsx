import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
} from '@devexpress/dx-grid-core';
import { DataTypeProvider } from './data-type-provider';
import { TableGroupRow } from './table-group-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithGrouping: jest.fn(),
  tableRowsWithGrouping: jest.fn(),
  isGroupTableCell: jest.fn(),
  isGroupIndentTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
    tableBodyRows: [{ type: 'undefined', id: 1, row: 'row' }],
    grouping: [{ columnName: 'a' }],
    draftGrouping: [{ columnName: 'a' }, { columnName: 'b', mode: 'add' }],
    expandedGroups: new Map(),
  },
  action: {
    toggleGroupExpanded: jest.fn(),
  },
  template: {
    tableViewCell: {
      tableRow: { type: 'undefined', id: 1, row: 'row' },
      tableColumn: { type: 'undefined', id: 1, column: 'column' },
      style: {},
    },
  },
  plugins: ['GroupingState', 'TableView'],
};

const defaultProps = {
  groupCellTemplate: () => null,
  groupIndentCellTemplate: () => null,
  groupIndentColumnWidth: 100,
};

describe('TableGroupRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    tableColumnsWithGrouping.mockImplementation(() => 'tableColumnsWithGrouping');
    tableRowsWithGrouping.mockImplementation(() => 'tableRowsWithGrouping');
    isGroupTableCell.mockImplementation(() => false);
    isGroupIndentTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters extending', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableBodyRows)
        .toBe('tableRowsWithGrouping');
      expect(tableRowsWithGrouping)
        .toBeCalledWith(defaultDeps.getter.tableBodyRows);
    });

    it('should extend tableColumns', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.tableColumns)
        .toBe('tableColumnsWithGrouping');
      expect(tableColumnsWithGrouping)
        .toBeCalledWith(
          defaultDeps.getter.tableColumns,
          defaultDeps.getter.grouping,
          defaultDeps.getter.draftGrouping,
          defaultProps.groupIndentColumnWidth,
        );
    });
  });

  it('should render groupIndent cell on select group column and foreign group row intersection', () => {
    isGroupIndentTableCell.mockImplementation(() => true);
    const groupIndentCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
          groupIndentCellTemplate={groupIndentCellTemplate}
        />
      </PluginHost>,
    );

    expect(isGroupIndentTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(groupIndentCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });

  it('should render group cell on select group column and group row intersection', () => {
    isGroupTableCell.mockImplementation(() => true);
    const groupCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
          groupCellTemplate={groupCellTemplate}
        />
      </PluginHost>,
    );

    expect(isGroupTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableViewCell.tableRow,
        defaultDeps.template.tableViewCell.tableColumn,
      );
    expect(groupCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        ...defaultDeps.template.tableViewCell,
        row: defaultDeps.template.tableViewCell.tableRow.row,
        column: defaultDeps.template.tableViewCell.tableColumn.column,
      }));
  });

  it('can render custom formatted data in table cell', () => {
    isGroupTableCell.mockImplementation(() => true);
    const groupCellTemplate = jest.fn(() => null);
    const valueFormatter = jest.fn(() => <span />);
    const deps = {
      template: {
        tableViewCell: {
          tableRow: { type: 'undefined', id: 1, row: { value: 'row' } },
          tableColumn: { type: 'undefined', id: 1, column: { name: 'column', dataType: 'column' } },
          style: {},
        },
      },
    };

    mount(
      <PluginHost>
        <DataTypeProvider
          type="column"
          formatterTemplate={valueFormatter}
        />
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableGroupRow
          {...defaultProps}
          groupCellTemplate={groupCellTemplate}
        />
      </PluginHost>,
    );

    expect(valueFormatter)
      .toHaveBeenCalledWith({
        column: deps.template.tableViewCell.tableColumn.column,
        row: deps.template.tableViewCell.tableRow.row,
        value: deps.template.tableViewCell.tableRow.row.value,
      });
    expect(groupCellTemplate.mock.calls[0][0])
      .toHaveProperty('children');
  });
});
