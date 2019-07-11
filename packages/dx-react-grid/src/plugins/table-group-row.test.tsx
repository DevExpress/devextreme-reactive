import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  tableGroupCellColSpanGetter,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupIndentStubTableCell,
  isGroupTableRow,
  calculateGroupCellIndent,
} from '@devexpress/dx-grid-core';
import { TableGroupRow } from './table-group-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithGrouping: jest.fn(),
  tableRowsWithGrouping: jest.fn(),
  tableGroupCellColSpanGetter: jest.fn(),
  isGroupTableCell: jest.fn(),
  isGroupIndentTableCell: jest.fn(),
  isGroupIndentStubTableCell: jest.fn(),
  isGroupTableRow: jest.fn(),
  calculateGroupCellIndent: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }, { name: 'b' }],
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
    tableBodyRows: [{ type: 'undefined', id: 1, row: 'row' }],
    grouping: [{ columnName: 'a' }],
    draftGrouping: [{ columnName: 'a' }, { columnName: 'b' }],
    expandedGroups: [],
    isGroupRow: () => false,
    getTableCellColSpan: () => 1,
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
  contentComponent: () => null,
  iconComponent: () => null,
  containerComponent: ({ children }) => children,
  indentCellComponent: () => null,
  rowComponent: () => null,
  indentColumnWidth: 100,
  contentCellPadding: 'contentCellPadding',
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
    tableGroupCellColSpanGetter.mockImplementation(() => 'tableGroupCellColSpanGetter');
    isGroupTableCell.mockImplementation(() => false);
    isGroupIndentTableCell.mockImplementation(() => false);
    isGroupIndentStubTableCell.mockImplementation(() => false);
    isGroupTableRow.mockImplementation(() => false);
    calculateGroupCellIndent.mockReturnValue('groupCellIndent');
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

    it('should extend getTableCellColSpan', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe('tableGroupCellColSpanGetter');
      expect(tableGroupCellColSpanGetter)
        .toBeCalledWith(defaultDeps.getter.getTableCellColSpan);
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
            showColumnsWhenGrouped
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBeTruthy();
      expect(showColumnWhenGrouped('B')).toBeTruthy();
    });

    it('should keep column in table if column value specified', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableGroupRow
            {...defaultProps}
            showColumnsWhenGrouped={false}
            columnExtensions={[
              { columnName: 'A', showWhenGrouped: true },
            ]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBeTruthy();
      expect(showColumnWhenGrouped('B')).toBeFalsy();
    });
  });

  // tslint:disable-next-line: max-line-length
  it('should render groupIndent cell on select group column and foreign group row intersection', () => {
    isGroupTableRow.mockImplementation(() => true);
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
        defaultDeps.getter.grouping,
      );

    expect(tree.find(indentCellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  // tslint:disable-next-line: max-line-length
  it('should render indent stub cell on select group column and foreign group row intersection', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupIndentStubTableCell.mockImplementation(() => true);

    const StubCell = () => null;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template
          name="tableCell"
        >
          {params => <StubCell {...params}/>}
        </Template>
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isGroupIndentStubTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
        defaultDeps.getter.grouping,
      );
    expect(tree.find(StubCell).exists());
  });

  // tslint:disable-next-line: max-line-length
  it('should pass correct props to indent stub cell', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupIndentStubTableCell.mockImplementation(() => true);

    const StubCell = () => null;

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template
          name="tableCell"
        >
          {params => <StubCell {...params}/>}
        </Template>
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(StubCell).props())
      .toMatchObject({
        tableRow: defaultDeps.template.tableCell.tableRow,
        tableColumn: defaultDeps.template.tableCell.tableColumn,
        style: {},
      });
  });

  describe('cellComponent', () => {
    it('should render group cell on select group column and group row intersection', () => {
      isGroupTableRow.mockImplementation(() => true);
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
      isGroupTableRow.mockImplementation(() => true);
      isGroupTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          expandedGroups: [],
        },
        template: {
          tableCell: {
            tableRow: { row: { compoundKey: '1' } },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };
      jest.spyOn(deps.getter.expandedGroups, 'indexOf').mockReturnValue(1);

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
          expanded: true,
          onToggle: expect.any(Function),
        });
      expect(deps.getter.expandedGroups.indexOf)
        .toBeCalledWith('1');

      tree.find(defaultProps.cellComponent).props().onToggle();
      expect(defaultDeps.action.toggleGroupExpanded.mock.calls[0][0])
        .toEqual({ groupKey: '1' });
    });
  });

  it('should provide components to a cell', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        contentComponent: defaultProps.contentComponent,
        iconComponent: defaultProps.iconComponent,
      });
  });

  it('should calculate cell fixed position', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableGroupRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        position: 'calc(groupCellIndentpx + contentCellPadding)',
        side: 'left',
      });
  });

  it('can render custom formatted data in group row cell', () => {
    isGroupTableRow.mockImplementation(() => true);
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
      .find('TemplatePlaceholderBase')
      .findWhere(node => node.prop('name') === 'valueFormatter').last();

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
