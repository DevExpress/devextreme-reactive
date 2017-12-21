import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  GROUP_ADD_MODE,
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
} from '@devexpress/dx-grid-core';
import { TableGroupRow } from './table-group-row';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithGrouping: jest.fn(),
  tableRowsWithGrouping: jest.fn(),
  isGroupTableCell: jest.fn(),
  isGroupIndentTableCell: jest.fn(),
  isGroupTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }, { name: 'b' }],
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
    tableBodyRows: [{ type: 'undefined', id: 1, row: 'row' }],
    grouping: [{ columnName: 'a' }],
    draftGrouping: [{ columnName: 'a' }, { columnName: 'b', draft: GROUP_ADD_MODE }],
    expandedGroups: new Map(),
    isGroupRow: () => false,
  },
  action: {
    toggleGroupExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', id: 1, row: 'row' },
      tableColumn: { type: 'undefined', id: 1, column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', id: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['GroupingState', 'Table'],
};

const defaultProps = {
  cellComponent: () => null,
  indentCellComponent: () => null,
  rowComponent: () => null,
  indentColumnWidth: 100,
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
    isGroupTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters extending', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithGrouping');
      expect(tableRowsWithGrouping)
        .toBeCalledWith(defaultDeps.getter.tableBodyRows, defaultDeps.getter.isGroupRow);
    });

    it('should extend tableColumns', () => {
      const tree = mount((

        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      expect(tableColumnsWithGrouping)
        .toBeCalledWith(
          defaultDeps.getter.columns,
          defaultDeps.getter.tableColumns,
          defaultDeps.getter.grouping,
          defaultDeps.getter.draftGrouping,
          defaultProps.indentColumnWidth,
          expect.any(Function),
        );
    });
  });

  describe('hide grouping column', () => {
    it('should all columns be hidden', () => {
      const deps = {
        getter: {
          columns: [
            { name: 'A' },
            { name: 'B' },
          ],
        },
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableGroupRow
            {...defaultProps}
            showColumnWhenGrouped
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBe(true);
      expect(showColumnWhenGrouped('B')).toBe(true);
    });

    it('should keep column in table if column value specified', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
            showColumnWhenGrouped={false}
            columnExtensions={[
              { columnName: 'A', showWhenGrouped: true },
            ]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBe(true);
      expect(showColumnWhenGrouped('B')).toBe(false);
    });
  });

  it('should render groupIndent cell on select group column and foreign group row intersection', () => {
    isGroupIndentTableCell.mockImplementation(() => true);
    const indentCellComponent = () => null;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
          indentCellComponent={indentCellComponent}
        />
      </PluginHost>
    ));

    expect(isGroupIndentTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(indentCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  describe('cellComponent', () => {
    it('should render group cell on select group column and group row intersection', () => {
      isGroupTableCell.mockImplementation(() => true);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isGroupTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
          column: defaultDeps.template.tableCell.tableColumn.column,
        });
    });

    it('should provide correct cell params', () => {
      isGroupTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          expandedGroups: new Set(),
        },
        template: {
          tableCell: {
            tableRow: { row: { compoundKey: '1' } },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };
      jest.spyOn(deps.getter.expandedGroups, 'has').mockReturnValue('hasTest');

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          expanded: 'hasTest',
          onToggle: expect.any(Function),
        });
      expect(deps.getter.expandedGroups.has)
        .toBeCalledWith('1');

      tree.find(defaultProps.cellComponent).props().onToggle();
      expect(defaultDeps.action.toggleGroupExpanded.mock.calls[0][0])
        .toEqual({ groupKey: '1' });
    });
  });

  it('can render custom formatted data in group row cell', () => {
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    const valueFormatterTemplatePlaceholder = tree
      .find('TemplatePlaceholder')
      .findWhere(node => node.prop('name') === 'valueFormatter');

    expect(valueFormatterTemplatePlaceholder.prop('params'))
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        value: defaultDeps.template.tableCell.tableRow.row.value,
      });
  });

  it('should render row by using rowComponent', () => {
    isGroupTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isGroupTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });
});
